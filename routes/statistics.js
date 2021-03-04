const express = require("express");
const router = express.Router();
const DataBase = require("../databaseClass")
router.use(express.static("../public/statistics/statistics"));

router.get('/:shortUrl', async (req, res) => {
    const inputShortUrl = req.params.shortUrl;
    await DataBase.getAllData()
    for (urlObj of DataBase.urls) {
        if (urlObj["shortUrl"] === inputShortUrl) {
            res.send(JSON.stringify(urlObj, null, 2))
            return;
        }
    }
    res.send({"Error": `no such short URL: ${inputShortUrl}`})
})

module.exports = router;