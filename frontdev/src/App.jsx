import Movieslist from "./components/Movies_Theatre/Movieslist";
import TheatreList from "./components/Movies_Theatre/TheatreList";
import Verified from "./components/Verfication/Verified";
import Verifiying from "./components/Verfication/Verifiying";
import Homepage from "./components/home/Homepage";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Pay from "./components/payment/Pay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/Movies_Theatre/MovieDetail";
import Ticket from "./components/payment/Ticket.jsx"
function App() {
  return (
    <>
      
        <BrowserRouter >
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pay/:id" element={<Pay />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/movies" element={<Movieslist/>}/>
            <Route path="/moviedetail" element={<MovieDetail/>}/>
            <Route path="/theatre" element={<TheatreList/>}/>
            <Route path="/verified" element={<Verified/>}/>
            <Route path="/verfiying" element={<Verifiying/>}/>
            <Route path="/ticket" element={<Ticket/>}/>
          </Routes>
         
        </BrowserRouter>
    </>
  );
}

export default App;
