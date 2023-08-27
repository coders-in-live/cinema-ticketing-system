const joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { hashPassword } = require("../helpers/hashPassword");
const registerValidator = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  password: joi.string().min(6).required(),
  image: joi
    .object({
      filename: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/webp")
        .required(),
      size: joi
        .number()
        .max(1024 * 1024)
        .required(),
    })
    .required(),
});

async function logOut(req, res, next) {
  try {
    res.clearCookie("jwt");
  } catch (error) {
    console.log(error);
  }
}

async function logIn(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return next({ status: 400, errors: ["Email and password are required"] });
  const account = await User.findOne({ email });
  if (!account)
    return res.status(400).json({ Error: "Invalid Email or Password" });

  const hasCorrectCredential = await bcrypt.compare(password, account.password);
  if (!hasCorrectCredential)
    return res.status(400).json({ Error: "Invalid Email or password" });
  account.password = undefined;
  try {
    const token = await generateToken({
      email: account.email,
      id: account._id,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(token);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res, next) {
  const { name, email, phone, password } = req.body;
  const image = req.file;
  const hashedPassword = await hashPassword(password);
  if (!req.file) {
    console.log(
      `Image can not be empty only PNG, JPG and WebP image files are supported`
    );
  }
  if (!hashedPassword) return console.log("Error hashingPassword");
  const { error } = await registerValidator.validate({
    name: req.body.title,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    image: {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
  if (error) {
    console.log("error is here");
    return;
  }
  try {
    const user = User({
      name,
      email,
      phone,
      image,
      password: hashPassword,
    });
    if (req.file) {
      const { originalname, path } = req.file;
      const imageData = await fs.promises.readFile(path);
      const encodedImage = imageData.toString("base64");
      client.image = encodedImage;
      await fs.promises.unlink(path);
    }
    await user.save();
    if (!user) return res.status(500).json(error.details[0].message);
    const token = await generateToken({ id: user._id });
    if (!token) return next({ status: 500 });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("user added succesfully");
  } catch (error) {
    return console.log(error);
  }
}
async function updateUser(req, res, next) {
  let id = req.params.id;
  var data = req.body;
  const hashedPassword = hashPassword(data.password);
  let new_image = "";
  if (req.file) {
    const { originalname, path } = req.file;
    const imageData = await fs.promises.readFile(path);
    const encodedImage = imageData.toString("base64");
    new_image = encodedImage;
    await fs.promises.unlink(path);
  } else {
    new_image = req.body.old_image;
  }
  try {
    const user = await User.findByIdAndUpdate(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      image: new_image,
    });
    if (!user) console.log("user Updated Sucessfully");
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(req, res, next) {
  const id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    console.log("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { createUser, updateUser, deleteUser, logIn, logOut};
