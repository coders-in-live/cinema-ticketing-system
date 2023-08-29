const joi = require("@hapi/joi");
const fs = require("fs");
const Cinema = require("../models/cinema");

const cinemaValidotor = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  length: joi.string().required(),
  timeStart: joi.string().required(),
  yearPublished: joi.string().required(),
  genre: joi.string().required(),
  avaliableAt: joi.string().required(),
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

async function Cinema_Frontend(req, res, next) {
  try {
    const client = await Cinema.find({});
    res.json(client);
  } catch (err) {
    res.status(500).send(err);
  }
}
async function CinemaRender(req, res, next) {
  res.render("cinema/cinemapost");
}
async function CinemaPost(req, res, next) {
  if (!req.file) {
    return res.render("cinema/cinemapost", {
      error: `Image can not be empty only PNG, JPG and WebP image files are supported`,
    });
  }
  const { error } = await cinemaValidotor.validate({
    title: req.body.title,
    description: req.body.description,
    length: req.body.length,
    timeStart: req.body.timeStart,
    yearPublished: req.body.yearPublished,
    genre: req.body.genre,
    avaliableAt: req.body.avaliableAt,
    ticketPrice: req.body.ticketPrice,

    image: {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
  if (error) {
    console.log("error is here");
    return res.render("cinema/cinemapost", { error: error.details[0].message });
  }
  try {
    var client = new Cinema();
    client.title = req.body.title;
    (client.description = req.body.description),
      (client.length = req.body.length),
      (client.timeStart = req.body.timeStart),
      (client.yearPublished = req.body.yearPublished),
      (client.genre = req.body.genre),
      (client.avaliableAt = req.body.avaliableAt),
      (client.ticketPrice = req.body.ticketPrice);
    if (req.file) {
      const { originalname, path } = req.file;
      const imageData = await fs.promises.readFile(path);
      const encodedImage = imageData.toString("base64");
      client.image = encodedImage;
      await fs.promises.unlink(path);
    }
    await client.save();
    res.redirect("/cinemalist");
  } catch (error) {
    console.log(error);
  }
}
function CinemaList(req, res, next) {
  Cinema.find({}).then((items) => {
    res.render("cinema/cinemalist", { items });
  });
}
async function CinemaEdit(req, res, next) {
  const cinemas = await Cinema.find({});
  id = req.params.id;
  try {
    cinemas.find((item) => {
      if (item._id == id) {
        res.render("cinema/cinemaedit", {
          item: item,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function UpdatedCinema(req, res, next) {
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
    const cinema = await Cinema.findByIdAndUpdate(id, {
      title: data.title,
      description: data.description,
      length: data.length,
      timeStart: data.timeStart,
      yearPublished: data.yearPublished,
      genre: data.genre,
      avaliableAt: data.avaliableAt,
      ticketPrice: data.ticketPrice,

      image: new_image,
    });
    if (!cinema)
      return res.status(404).send("cinema with specific Id is not Found");
    res.redirect("/cinemalist");
  } catch (error) {
    console.log(error);
  }
}
async function DeleteCinema(req, res, next) {
  const id = req.params.id;
  try {
    await Cinema.deleteOne({ _id: id });
    console.log("deleted");
    res.redirect("/cinemalist");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  CinemaRender,
  Cinema_Frontend,
  CinemaPost,
  CinemaList,
  UpdatedCinema,
  CinemaEdit,
  DeleteCinema,
};
