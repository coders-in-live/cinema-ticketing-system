const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const EjsLayouts = require("express-ejs-layouts");
const adminRouter = require("./routes/routers.js");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(EjsLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));
app.use(adminRouter);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
      console.log(`port is listening http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
