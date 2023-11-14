/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import cinema from "../../assets/videos/cinema.gif";
import axios from "axios";
import GoogleMaps from "../GoogleMap/GoogleMap";
import Footer from "../navbar/Footer";
import { Link } from "react-router-dom";
function Homepage() {
  const [cinemas, setCinemas] = useState([]);
  const [record, setRecord] = useState([]);
  const [theatre, setTheatre] = useState([]);
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
    setRecord([...cinemas, ...theatre]);
  }, [cinemas, theatre]);
  return (
    <>
      <div className="m-10">
        <div className="flex justify-center items-center">
          <img
            src={cinema}
            alt="gif"
            style={{ width: "100%", height: "65vh" }}
          />
        </div>
        <div className="text-red-900 text-6xl font-heading m-10 text-center">
          Get the ticket and enjoy your movie anywhere at anytime!
        </div>
        <div className="flex flex-wrap justify-center">
          {record.map((cinemaimg, index) => (
            <div key={index} className="w-1/3 p-2">
              <Link to="/moviedetail">
                <img
                  src={`data:image/png;base64,${cinemaimg.image}`}
                  alt={`Image ${index}`}
                  className="w-60 h-80"
                />
              </Link>
              <h1 className="text-4xl font-heading">{cinemaimg.title}</h1>
            </div>
          ))}
        </div>
      </div>
      <GoogleMaps />
      <Footer />
    </>
  );
}

export default Homepage;
