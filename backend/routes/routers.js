const express = require("express");
var upload = require("../utils/multer");
const {
  createUser,
  deleteUser,
  updateUser,
  logIn,
  logOut,
} = require("../controllers/login_signup-controller");
const router = express.Router();
router.get("/user/login",logIn)
router.get("/user/logout",logOut)
router.post("/user/register", upload.single("image"), createUser);
router.put("/user/updateaccount/:id", updateUser);
router.delete("/user/deleteaccount/:id", deleteUser);
module.exports = router;
