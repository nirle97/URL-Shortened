const express = require("express");
const router = express.Router();
const {writeFileSync ,readFileSync} = require("fs")

router.get('/', (req, res) => {
    console.log(req);
    res.send('got the link')
})

router.post('/new', (req, res) => {
    console.log(req.body);
    res.send("index")
})

module.exports = router;