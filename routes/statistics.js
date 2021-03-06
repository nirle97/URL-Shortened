const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")
router.get('/:shortUrl', async (req, res) => {
    const inputShortUrl = req.params.shortUrl;
    const urlObj = await DataBase.getFullUrlObjectByShortUrl(inputShortUrl)
    if (urlObj["Error"]) {
        res.status(404).send({"Error": `no such short URL: ${inputShortUrl}`});
        return;
    }
    res.status(200).send(JSON.stringify(urlObj, null, 2))
    return;
})

module.exports = router;