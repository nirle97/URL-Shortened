const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")

router.post('/', async (request, response) => {
    const urlValidation = await DataBase.isValidUrl(request.body["fullUrl"]); //check for valid URL
    if (!urlValidation) {
        response.send({"Error" :"Invalid URL"});
        return;
    }

    const urlExists = await DataBase.isUrlExists(request.body["fullUrl"]) //check if URL already exists
    if (urlExists !== false) {
        response.send({"Error" :"URL already exists",
         "fullUrl": request.body["fullUrl"],
         "shortUrl": urlExists["shortUrl"]
        });

    } else {
        const newShortUrl = await DataBase.appendUrl(request.body["fullUrl"]);
        response.send({"shortUrl": newShortUrl});
    }
})

router.get('/:shortURL', async (req, res) => {
    inputShortUrl = req.params.shortURL;
    const fullUrl = await DataBase.getFullUrlById(inputShortUrl)
    if (fullUrl === false) {
        res.send({"Error": `no such short URL: ${inputShortUrl}`})
        return;
    }
    res.redirect(fullUrl);    
})

module.exports = router;
