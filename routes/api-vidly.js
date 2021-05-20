const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
// const { string, func, valid } = require("joi");

const collName = "movieList";
const VidlySchema = mongoose.Schema({
  movie: {
    type: String,
    required: true,
    min: 3,
  },
  release: {
    type: Number,
    required: true,
    min: 1990,
  },
});

const VidlyModel = mongoose.model(collName, VidlySchema);

// Create
router.post("/", async (req, res) => {
  //Validate
  let checkValidate = validateFormVidly(req.body);

  // Return if error
  if (checkValidate.error)
    return res.status(422).send(checkValidate.error.details[0].message);

  // if no error Update vidlyList
  const newMovies = new VidlyModel({
    movie: req.body.movie,
    release: req.body.release,
  });

  const saveNewMovie = await newMovies.save();

  res.send(saveNewMovie);
});

// Read
router.get("/", async (req, res) => {
  const allMovie = await VidlyModel.find();
  res.send(allMovie);
});

// Update
router.put("/:id", async (req, res) => {
  try {
    // Get Movie By ID and Updated it
    const movie = await VidlyModel.findById(req.params.id);
    // validate
    const validateIt = validateFormVidly(req.body);
    if (validateIt.error) return res.send(`not Valid ==> ${validateIt.error}`);

    const updateMovie = await movie.updateOne({
      movie: req.body.movie,
      release: req.body.release,
    });

    res.send(updateMovie);
  } catch (error) {
    res.send(`sorry ${error}`);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const itemToDelete = await VidlyModel.findById(req.params.id).deleteOne();
    if (itemToDelete.n === 0) return res.send("already deleted");
    res.send(itemToDelete);
  } catch (error) {
    if (error.name === "CastError")
      return res.status(404).send("Please check given ID");
    res.send(error);
  }
});

// Function
function validateFormVidly(reqBody) {
  // This will return validation
  const schema = Joi.object({
    movie: Joi.string().min(3).required(),
    release: Joi.number().greater(1990).required(),
  });

  return schema.validate(reqBody);
}

module.exports = router;
