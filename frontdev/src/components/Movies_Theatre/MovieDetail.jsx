import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../elements";
import Footer from "../navbar/Footer";
import { Link } from "react-router-dom";
function MovieDetail() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [record, setRecord] = useState([]);
  const [theatre, setTheatre] = useState([]);
  async function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }
  async function getTheatre() {
    try {
      const response = await axios.get("http://localhost:3001/theatrefront");
      const data = response.data;
      setTheatre(data);
    } catch (error) {
      console.log(error);
    }
  }
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
    getTheatre();
    getToken();
    setRecord([...cinemas, ...theatre]);
  }, [cinemas, theatre]);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 m-20">
        {record.map((item) => (
          <div key={item.id} className="flex">
            <img
              src={`data:image/png;base64,${item.image}`}
              alt="Item"
              className="w-60 h-80 object-cover"
            />
            <div className="space-y-4">
              <p className="ml-4">Movie Name: {item.title}</p>
              <p className="ml-4">Year: {item.yearPublished}</p>
              <p className="ml-4">Genre: {item.genre}</p>
              <p className="ml-4">Time Start: {item.timeStart}</p>
              <p className="ml-4">Length:{item.length}</p>
              <p className="ml-4">Description: {item.description}</p>
              <p className="ml-4">Ticket Price: {item.ticketPrice} Birr</p>
              <div className="flex ml-10">
                <Link to={isLoggedIn ? `/pay/${item._id}` : `/login`}>
                  <Button variant="secondary">Buy Ticket</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MovieDetail;
