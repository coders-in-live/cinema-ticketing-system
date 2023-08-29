const express = require("express");
var upload = require("../utils/multer");
const {
  createUser,
  deleteUser,
  updateUser,
  logIn,
  logOut,
} = require("../controllers/login_signup-controller");
const {
  CinemaList,
  CinemaRender,
  CinemaPost,
  CinemaEdit,
  UpdatedCinema,
  DeleteCinema,
} = require("../controllers/cinema-controller.js");
const {
  TheatreRender,
  TheatreList,
  TheatrePost,
  TheatreEdit,
  UpdatedTheatre,
  DeleteTheatre,
} = require("../controllers/theatre-controller.js");
const Dashboard = require("../controllers/dashboard-controller");
const router = express.Router();

//dashboard
router.get("/",Dashboard)
//user signup,login
router.get("/user/login", logIn);
router.get("/user/logout", logOut);
router.post("/user/register", upload.single("image"), createUser);
router.put("/user/updateaccount/:id", updateUser);
router.delete("/user/deleteaccount/:id", deleteUser);

//cinema CRUD operation

router.get("/cinema", CinemaRender);
router.get("/cinemalist", CinemaList);
router.post("/cinema", upload.single("image"), CinemaPost);
router.get("/cinemaedit/:id", CinemaEdit);
router.post("/cinemaedit/:id", upload.single("image"), UpdatedCinema);
router.get("/deletecinema/:id", DeleteCinema);

//theatre CRUD operation
router.get("/theatre", TheatreRender);
router.get("/theatrelist", TheatreList);
router.post("/theatre", upload.single("image"), TheatrePost);
router.get("/theatreedit/:id", TheatreEdit);
router.post("/theatreedit/:id", upload.single("image"), UpdatedTheatre);
router.get("/deletetheatre/:id", DeleteTheatre);

module.exports = router;
