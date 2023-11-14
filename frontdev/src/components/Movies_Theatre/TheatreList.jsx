/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleMaps from "../GoogleMap/GoogleMap";
import Footer from "../navbar/Footer";
function TheatreList() {
  const [theatre, setTheatre] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  async function getTheatre() {
    try {
      const response = await axios.get("http://localhost:3001/theatrefront");
      const data = response.data;
      setTheatre(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTheatre();
  }, []);
  useEffect(() => {
    const filter = theatre.filter((result) => {
      const title = result.title
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      return title;
    });
    // const filteredItems =  cinemas.filter(item => typeof item.genre === 'string' && item.genre.split(' ').includes(category))

    setFiltered(filter);
  }, [searchQuery, theatre]);
  return (
    <>
      <div className="flex gap-20 item-center justify-center">
        <input
          type="text"
          id="searchInput"
          style={{ backgroundColor: "lightgray", width: "20em", height: "3em" }}
          className="px-4 py-2 bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          id="filterSelect"
          style={{ backgroundColor: "yellow" }}
          className="px-4 py-2 bg-yellow-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="">All</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        {/* <button
        id="searchButton"
        class="px-4 py-2 bg-blue-500 text-white rounded-r-md"
      >
        Search
      </button> */}
      </div>
      <div className="flex flex-wrap justify-center m-10">
        {searchQuery === ""
          ? theatre.map((item, index) => (
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
              </div>
            ))}
      </div>
      <GoogleMaps />
      <Footer />
    </>
  );
}

export default TheatreList;
