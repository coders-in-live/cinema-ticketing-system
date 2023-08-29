const joi = require("@hapi/joi");
const fs = require("fs");
const Cinema = require("../models/cinema");
const Theatre = require("../models/theatre");

const theatreValidotor = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  length: joi.string().required(),
  timeStart: joi.string().required(),
  ticketPrice: joi.number().required(),
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

async function Theatre_Frontend(req, res, next) {
  try {
    const client = await Theatre.find({});
    res.json(client);
  } catch (err) {
    res.status(500).send(err);
  }
}
async function TheatreRender(req, res, next) {
  res.render("theatre/theatrepost");
}
async function TheatrePost(req, res, next) {
  if (!req.file) {
    return res.render("theatre/theatrepost", {
      error: `Image can not be empty only PNG, JPG and WebP image files are supported`,
    });
  }
  const { error } = await theatreValidotor.validate({
    title: req.body.title,
    description: req.body.description,
    length: req.body.length,
    timeStart: req.body.timeStart,
    ticketPrice: req.body.ticketPrice,

    image: {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
  if (error) {
    console.log("error is here");
    return res.render("theatre/theatrepost", {
      error: error.details[0].message,
    });
  }
  try {
    var theatre = new Theatre();
    theatre.title = req.body.title;
    (theatre.description = req.body.description),
      (theatre.length = req.body.length),
      (theatre.timeStart = req.body.timeStart),
      (theatre.ticketPrice = req.body.ticketPrice);
    if (req.file) {
      const { originalname, path } = req.file;
      const imageData = await fs.promises.readFile(path);
      const encodedImage = imageData.toString("base64");
      theatre.image = encodedImage;
      await fs.promises.unlink(path);
    }
    await theatre.save();
    res.redirect("/theatrelist");
  } catch (error) {
    console.log(error);
  }
}
function TheatreList(req, res, next) {
  Theatre.find({}).then((items) => {
    res.render("theatre/theatrelist", { items });
  });
}
async function TheatreEdit(req, res, next) {
  const cinemas = await Theatre.find({});
  id = req.params.id;
  try {
    cinemas.find((item) => {
      if (item._id == id) {
        res.render("theatre/theatreedit", {
          item: item,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function UpdatedTheatre(req, res, next) {
  let id = req.params.id;
  var data = req.body;
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
    const cinema = await Theatre.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      length: req.body.length,
      timeStart: req.body.timeStart,
      ticketPrice: req.body.ticketPrice,

      image: new_image,
    });
    if (!cinema)
      return res.status(404).send("theatre with specific Id is not Found");
    res.redirect("/theatrelist");
  } catch (error) {
    console.log(error);
  }
}
async function DeleteTheatre(req, res, next) {
  const id = req.params.id;
  try {
    await Theatre.deleteOne({ _id: id });
    res.redirect("/theatrelist");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  TheatreRender,
  Theatre_Frontend,
  TheatrePost,
  TheatreList,
  UpdatedTheatre,
  TheatreEdit,
  DeleteTheatre,
};
