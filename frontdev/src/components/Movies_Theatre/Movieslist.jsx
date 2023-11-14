/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleMaps from "../GoogleMap/GoogleMap";
import Footer from "../navbar/Footer";

function Movieslist() {
  const [cinemas, setCinemas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  async function getCinema() {
    try {
      const response = await axios.get("http://localhost:3001/cinemafront");
      if (response.status === 200) {
        const data = response.data;
        setCinemas(data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  useEffect(() => {
    getCinema();
  }, []);
  useEffect(() => {
    const filter = cinemas.filter((result) => {
      const title = result.title
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const description = result.description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const genre = result.genre.includes(searchQuery?.toLowerCase());
      return title || description || genre;
    });
    // const filteredItems =  cinemas.filter(item => typeof item.genre === 'string' && item.genre.split(' ').includes(category))

    setFiltered(filter);
    // setFiltered(filteredItems)
    // console.log(filteredItems);
  }, [searchQuery, cinemas]);
  const filteredItems =
    selectedCategories.length > 0
      ? cinemas.filter((item) => {
          const itemCategories =
            item.genre &&
            typeof item.genre === "object" &&
            Array.isArray(item.genre)
              ? item.genre.map((category) => category.trim())
              : [];
          return selectedCategories.some((category) =>
            itemCategories.includes(category)
          );
        })
      : cinemas;
  // console.log(filteredItems);
  const handleCategoryChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedOptions);
  };

  return (
    <>
      <div className="flex gap-20 item-center justify-center">
        <input
          type="text"
          id="searchInput"
          style={{ backgroundColor: "lightgray", width: "20em", height: "3em" }}
          className="px-4 py-2 bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="Search..."
          multiple
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <select
          id="filterSelect"
          style={{ backgroundColor: "yellow" }}
          className="px-4 py-2 bg-yellow-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          value={selectedCategories}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Romance">Romance</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center m-10">
        {searchQuery === ""
          ? cinemas.map((item, index) => (
              <div key={index} className="w-1/3 p-2">
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={`Image ${index}`}
                  className="w-60 h-80"
                />
                <h1 className="text-4xl font-heading">{item.title}</h1>
              </div>
            ))
          : filtered.map((item, index) => (
              <div key={index} className="w-1/3 p-2">
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={`Image ${index}`}
                  className="w-60 h-80"
                />
                <h1 className="text-4xl font-heading">{item.title}</h1>
                <h1 className="text-l">{item.genre}</h1>
              </div>
            ))}
      </div>
      <GoogleMaps />
      <Footer />
    </>
  );
}

export default Movieslist;
