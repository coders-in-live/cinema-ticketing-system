import logo from "../../assets/images/Logo.png";
import prof from "../../assets/images/c60bd48f322b4d711b3e7227674e4f35-fotor-20230812214253.png";
// import bell from "../../assets/icons/notification.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const homepage = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/")
  };

  return (
    // container
    <div className="flex justify-between p-10 w-full">
      <div className="p-1 cursor-pointer">
        <Link to="/">
          <img className="w-32" src={logo} alt="cinema_logo" />
        </Link>
      </div>
      {homepage ? (
        <div
          className={`grid grid-rows-1 ${
            isLoggedIn ? "grid-cols-4" : "grid-cols-6"
          } gap-16`}
        >
          <div className="p-2 text-base font-regular">
            <Link to="/theatre">THEATRE</Link>
          </div>
          <div className="p-2 text-base font-regular">
            <Link to="/movies">CINEMA</Link>
          </div>
          <div className="p-2 text-base font-regular">
            <Link to="/moviedetail">BUYTICKET</Link>
          </div>
          {isLoggedIn ? (
            <div className="flex justify-items-end -mt-2">
              <div className="w-10 h-10">
                {/* <img src={bell} alt="notification_bell" className="pt-4 z-0" />
                <div className="rounded-full bg-cinema-400 w-8 h-8 text-tx_tertiary font-small flex items-center justify-center -mt-5 ml-5 z-10">
                  2
                </div> */}
              </div>
              <img
                className="w-20 rounded-full ml-10"
                src={prof}
                alt="username"
              />
              <div className="p-2 text-base font-regular">
                <button onClick={handleLogout}>LOGOUT</button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-2 text-base font-regular">
                <Link to="/login">LOGIN</Link>
              </div>
              <div className="p-2 text-base font-regular">
                <Link to="/signup">SIGNUP</Link>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
