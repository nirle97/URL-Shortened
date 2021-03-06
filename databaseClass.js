const {readFile, writeFile} = require("fs").promises;
const shortid = require("shortid");
require("dotenv").config();
const { setDataJsonbin, getDataJsonbin } = require("./backend-utils");
const dir = process.env.NODE_ENV === 'test' ? './database.test' : './database';

class DataBase {
    static urls = [];

    // static async getAllData() {
    //     const data = await readFile(`${dir}.json`, "utf8", (err, res) => {
    //             if (err) {
    //                 throw new Error(`${err} during reading from the database in POST method`)
    //             }
    //         });
    //         if (data == null) return;
    //         this.urls = JSON.parse(data);
    // }

    static async deleteAll() {
        this.urls = [];
        await setDataJsonbin(this.urls);
        writeFile(`${dir}.json`, JSON.stringify([]));
    }

    static async getFullUrlObjectByShortUrl(shortUrl) {
        //await this.getAllData()
        await getDataJsonbin();
        for (let urlObj of this.urls) {
            if (urlObj["shortUrl"] === shortUrl) return urlObj
        }
        return {"Error": "No Such Short URL"}
    }

    static async isUrlExists(fullURL) {
        // await this.getAllData();
        this.urls = await getDataJsonbin();
        if (fullURL.length === 0) return false;
        fullURL = fullURL.replace(/\/$/, "");
        for (let urlObj of this.urls) {
            if (urlObj["fullUrl"] === fullURL) {
                console.log('url is already exists');
                return {"shortUrl": urlObj["shortUrl"]};
            }
        } 
        return false
    }

    static async appendUrl(request) {
        // await this.getAllData();
        this.urls = await getDataJsonbin();
        const requestFullUrl = request.replace(/\/$/, "");
        const isExist = await this.isUrlExists(requestFullUrl)
        if (isExist !== false){
            console.log("URL already exists");
            for (let urlObj of this.urls) {
                if (urlObj["fullUrl"] === requestFullUrl) return {"shortUrl": urlObj["shortUrl"]}
            }
                 
        } else {
           let urlObj =
           {"fullUrl": requestFullUrl,
           "shortUrl": `${shortid.generate()}`,
           "Created at": `${(new Date).toISOString().slice(0,19).replace("T"," ")}`,
           "clicks": 0
           }
            this.urls.push(urlObj);
            await setDataJsonbin(this.urls);
            writeFile(`${dir}.json`, JSON.stringify(this.urls, null, 2), (err) => {
                console.log(err + 'problem in writing file to database');
            })
            console.log("new url was added to the database");
            return urlObj["shortUrl"]
       }
    }

    static async getFullUrlById(shortUrl) {
        // await this.getAllData();
        this.urls = await getDataJsonbin();
        for (let urlObj of this.urls) {
            if (urlObj["shortUrl"] === shortUrl) {
                urlObj["clicks"] += 1;
                await setDataJsonbin(this.urls);
                writeFile(`${dir}.json`, JSON.stringify(this.urls, null, 2));
                return urlObj["fullUrl"];
            }    
        } 
        return false;
    }
}

module.exports = DataBase
