// send full URL to the server
// first, check if exist if the database json (readfile - not sync)
// if exist: send back the short URL
// if doesn't: create an element with the shortURL, SQLdate, clicks number, and the fullURL
// append the elememt to the database with appenFile(?)
// send the element back to the client with res
// 
// all functions in the utills file
// all html elemnt in a different js file
// all client fetch request in main.js file
// 
// in the future: same with jsonbin: get for the file, read it, put for the url






require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrl = require('./routes/api-shortened-url')
const statistics = require('./routes/statistics')
const app = express();
app.use(express.json());
app.use('/api/shorturl', shortUrl);
app.use('/api/statistics', statistics);
app.use(express.static("public"));
// app.get("/", (req, res) => {
//   res.send(`We moved to another address :)  <a href="localhost:3000/api/shorturl"/>Find Us Here</a>`)
// });

module.exports = app;
