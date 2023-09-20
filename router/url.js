const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const {handleURLShortner} = require('../controller/url')

// route.post('/', handleURLShortner);

module.exports = route