const { static } = require("express");
const express = require("express");
const app = express();
const { env } = require("process");
// import router from another file
const routerApiVidly = require("./routes/api-vidly");
const routerHome = require("./routes/home");
const customerUrl = require("./routes/customers");
// debug
const vidlyDebug = require("debug")("foo:bar"); //after this we need enable ENV DEBUG . using this -> export DEBUG=vidly:debugtestName

// import mongoose
const mongoose = require("mongoose");
const databaseName = "vidly";

// Connect in here, and operate on another files
mongoose.connect(
  `mongodb+srv://user:a%24QkQE3myJ.wahE@cluster0.htwr9.mongodb.net/${databaseName}?authSource=admin&replicaSet=atlas-gsstiv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Build in midleware
app.use(express.json());
app.use(static("public"));

// it will enable using url encoded body same as json body
// we can also use 3rd party library like helmet for logging for example
app.use(express.urlencoded({ extended: true }));

// midleware for use routes from another file
app.use("/", routerHome.routerHome); // multiple import function
app.use("/api/vidly/", routerApiVidly); // single import
app.use("/api/customers/", customerUrl);
// Get env name, by default is env
// Change ENV using export NODE_ENV=production
let envName = app.get("env");
console.log(`env: ${envName}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening " + port));
