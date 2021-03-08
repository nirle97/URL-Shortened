require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrl = require('./routes/api-shortened-url')
const statistics = require('./routes/statistics');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/shorturl', shortUrl);
app.use('/api/statistics', statistics);
app.use(express.static("./public/shortUrl"));

module.exports = app;