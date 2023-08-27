const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const EjsLayouts = require("express-ejs-layouts");
const adminRouter = require("./routes/routers.js");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(EjsLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));
app.use(adminRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
      console.log("port is listening");
    });
  })
  .catch((err) => console.log(err));
