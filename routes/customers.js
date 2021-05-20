const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { route } = require("./api-vidly");
const vidlyDebug = require("debug")("development:bar");

// Create Schema and Model for Customer
const customerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
  },
  isGold: {
    type: Boolean,
    require: true,
  },
});

const customerCollName = "customer";

const CustomerModel = mongoose.model(customerCollName, customerSchema);

router.get("/", (req, res) => {
  vidlyDebug("d");
  return res.send("ok");
});

module.exports = router;
