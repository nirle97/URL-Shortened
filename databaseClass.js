const {readFile, writeFile} = require("fs").promises;
const shortid = require("shortid");

class DataBase {
    static urls = [];

    static async getAllData() {
        const data = await readFile("./database.json", "utf8", (err, res) => {
                if (err) {
                    throw new Error(`${err} during reading from the database in POST method`)
                }
            });
            if (data == null) return;
            this.urls = JSON.parse(data);
    }

    static async isValidUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }

    static async isUrlExists(fullURL) {
        await this.getAllData();
        console.log(fullURL);
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
        await this.getAllData();
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
           "date": `${(new Date).toISOString().slice(0,19).replace("T"," ")}`,
           "clicks": 0
           }
            this.urls.push(urlObj);
            writeFile("./database.json", JSON.stringify(this.urls, null, 2), (err) => {
            console.log(err + 'problem in writing file to database');
        })
        console.log("new url was added to the database");
        return urlObj["shortUrl"]
       }
    }

    static async getFullUrlById(shortUrl) {
        await this.getAllData();
        for (let urlObj of this.urls) {
            if (urlObj["shortUrl"] === shortUrl) {
                urlObj["clicks"] += 1;
                writeFile("./database.json", JSON.stringify(this.urls, null, 2));
                return urlObj["fullUrl"];
            }    
        } 
        return false;
    }

}

module.exports = DataBase
