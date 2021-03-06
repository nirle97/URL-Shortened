const fetch = require('node-fetch');
const DataBase = require("./databaseClass");

const getDataJsonbin = async function getDataJsonbin() {
    let options = { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2b$10$G3u8we1g.QbRfXsTOlEDiOFzRlmSXqbljvIljPRyQEe0uvwz8qX1K",
        },
    };
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6043435c5e29de07fcec591a' + '/latest', options);
        if (!response.ok) throw new Error ("couldn't get data from Jsonbin");
        const responseJson = await response.json();
        DataBase.urls = responseJson["record"];
        return DataBase.urls;
    } catch(e) {
        console.log(`${e}. could not get data from jsonbin`);
    }
};

const setDataJsonbin = async function setDataJsonbin(allUrlsObjects) {
    const options = { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2b$10$G3u8we1g.QbRfXsTOlEDiOFzRlmSXqbljvIljPRyQEe0uvwz8qX1K",
        },
        body: JSON.stringify(allUrlsObjects)
    };
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6043435c5e29de07fcec591a', options)
        if (!response.ok) throw new Error ("couldn't get data from Jsonbin");
        console.log("Data was successfully saved in Jsonbin");
    } catch(e) {
        console.log(`${e}. could not fetch data`);
    }
};

module.exports = { setDataJsonbin, getDataJsonbin };