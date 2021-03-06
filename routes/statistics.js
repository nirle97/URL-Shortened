const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")
const { getDataJsonbin } = require("../backend-utils")
router.get('/:shortUrl', async (req, res) => {
    const inputShortUrl = req.params.shortUrl;
    DataBase.urls = await getDataJsonbin()
    // await DataBase.getAllData()
    for (urlObj of DataBase.urls) {
        if (urlObj["shortUrl"] === inputShortUrl) {
            res.status(200).send(JSON.stringify(urlObj, null, 2))
            return;
        }
    }
    res.status(404).send({"Error": `no such short URL: ${inputShortUrl}`})
})

module.exports = router;