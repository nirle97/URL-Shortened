async function fullUrlPostRequest(fullUrlObj) {
    const options = { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fullUrlObj, null, 2)
    };
    try {
        const response = await fetch(`${HOST}/api/shorturl`, options)
        const responseJson = await response.json();

        if (Object.keys(responseJson).includes("Error")) {
            const error = responseJson["Error"];
            alert(error);

            if (error === "URL already exists") {
                if (isUrlExistsInTable(responseJson["fullUrl"])) return;
                addNewUrlToTable(responseJson["fullUrl"] ,responseJson["shortUrl"]);
            }
        } else {
            addNewUrlToTable(fullUrlObj["fullUrl"] ,responseJson["shortUrl"]);
        }

    } catch(e) {
        console.error(`${e}. There is a problem with the ${options.method} request`);
        alert("All apologizes, invalid URL :(")
    };
};


function addNewUrlToTable(fullUrl, shortUrl) {
    const tr = document.createElement("tr");
    tableBody.append(tr);
    [fullUrl, shortUrl].forEach((url, index) => {
        const td = document.createElement("td");
        const aTag = document.createElement("a");
        td.append(aTag);
        tr.append(td);
        aTag.innerText = url;
        index === 1 ? aTag.setAttribute("href", `${HOST}/api/shorturl/${url}`) : aTag.setAttribute("href", url); 
    })
}

function cleanUrlTable() {
    for (let tr of tableBody.querySelectorAll("tr")) {
        tableBody.removeChild(tr);
    }
}

function isUrlExistsInTable(fullUrl) {
    allTableTd = document.querySelectorAll("td");
    for (td of allTableTd) {
        if (td.innerText === fullUrl) return true;
    }
    return false;
}

async function retriviedData() {
    let options = { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(`${HOST}/api/shorturl`, options);
        if (!response.ok) throw new Error ("couldn't get data from Jsonbin");
        const responseJson = await response.json();
        for (urlObj of responseJson) {
            addNewUrlToTable(urlObj["fullUrl"], urlObj["shortUrl"])
        }  
    } catch(e) {
        console.log(`${e}. could not get data from jsonbin`);
    }
}

async function deleteAll() {
    const options = { 
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    };
    try {
        const response = await fetch(`${HOST}/api/shorturl`, options)
        const serverResponse = await response.json();
        if (response.status !== 200) {
            alert("Couldn't delete URLs")
            throw new Error("Problem in deleting URLs from database")
        } else {
            alert("All URLs were deleted successfuly")
        }

    } catch(e) {
        console.error(`${e}. There is a problem with the ${options.method} request`);
    };
};