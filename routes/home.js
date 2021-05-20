const express = require("express");
const router = express.Router();
const { string, func } = require("joi");
const Joi = require("joi");

router.all("/", (req, res) => {
  res.send("this is root or Home");
});

module.exports.routerHome = router;
