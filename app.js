const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json()); // get information from requests
app.use(bodyParser.urlencoded({ extended: false }));

require("./src/routes")(app);

module.exports = app;
