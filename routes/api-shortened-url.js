const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")
const { setDataJsonbin, getDataJsonbin } = require("../backend-utils");

router.post('/', async (request, response) => {
    const fullUrl = request.body["fullUrl"]

    function isValidUrl(fullUrl) { //check if URL stands in the basic structure
        const pattern = new RegExp(/^(https|ftp|torrent|image|irc):\/\/+([w|W]{3}\.)?(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/);
        return pattern.test(fullUrl);
    }
    if (!isValidUrl(fullUrl)) {
        response.status(404).send({"Error" :"Invalid URL"});
        return;
    }

    const urlExists = await DataBase.isUrlExists(fullUrl) //check if URL already exists
    if (urlExists !== false) {
        response.status(200).send({"Error" :"URL already exists",
         "fullUrl": fullUrl,
         "shortUrl": urlExists["shortUrl"]
        });

    } else {
        const newShortUrl = await DataBase.appendUrl(request.body["fullUrl"]);
        response.status(200).send({"shortUrl": newShortUrl});
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

router.get('/', async (req, res) => {
    let allUrlsObjects = [];
    allUrlsObjects = await getDataJsonbin(allUrlsObjects);
    res.status(200).send(JSON.stringify(allUrlsObjects));
});

router.delete('/', async (req, res) => {
    await DataBase.deleteAll();
    res.status(200).send(JSON.stringify({"message": "all URLs were deleted successfuly"}));
});

module.exports = router;
