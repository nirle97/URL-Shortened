const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")

router.post('/', async (request, response) => {
    const fullUrl = request.body["fullUrl"]

    function isValidUrl(fullUrl) {
        const pattern = new RegExp(/^(https?|ftp|torrent|image|irc):\/\/+([w|W]{3}\.)?(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/);
        return pattern.test(fullUrl);
    }

    if (!isValidUrl(fullUrl)) {
        response.status(404).send({"Error" :"Invalid URL"});
        return;
    }

    const urlExists = await DataBase.isUrlExists(fullUrl) //check if URL already exists
    if (urlExists !== false) {
        response.send({"Error" :"URL already exists",
         "fullUrl": fullUrl,
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
        res.status(404).send({"Error": `no such short URL: ${inputShortUrl}`})
        return;
    }
    res.redirect(fullUrl);    
})

module.exports = router;
