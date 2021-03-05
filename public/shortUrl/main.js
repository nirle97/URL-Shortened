const submitButton = document.querySelector("#submit-button");
const fullURL = document.querySelector("#url-input");
const HOST = "http://localhost:3001"

submitButton.addEventListener("click", fullUrlPostRequest)
submitButton.addEventListener("click", () => fullURL.value = "")

async function fullUrlPostRequest() {
    const urlToShorten = {"fullUrl": fullURL.value};
    const options = { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"fullUrl": fullURL.value}, null, 2)
    };
    try {
        const response = await fetch(`${HOST}/api/shorturl`, options)
        const serverResponse = await response.json();

        if (Object.keys(serverResponse).includes("Error")) {
            const error = serverResponse["Error"];
            alert(error);

            if (error === "URL already exists") {
                if (isUrlExistsInTable(serverResponse["fullUrl"])) return;
                addNewUrlToTable(serverResponse["fullUrl"] ,serverResponse["shortUrl"]);
            }
        } else {
            addNewUrlToTable(urlToShorten["fullUrl"] ,serverResponse["shortUrl"]);
        }

    } catch(e) {
        console.error(`${e}. There is a problem with the ${options.method} request`);
        alert("All apologizes, invalid URL :(")
    };
};

async function getStatistics() {
    const options = { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(`${HOST}/statistics`, options)
        if (response.status !== 200) {
            throw new Error(response.status)
        }
        const resJson = await response.json();


    } catch(e) {
        console.error(`${e} There is a problem with the ${options.method} request`);
        alert("All apologizes, an error occurred :(")
    };
};


function addNewUrlToTable(fullUrl, shortUrl) {
    const tableBody = document.querySelector(".table-body-row");
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

function isUrlExistsInTable(fullUrl) {
    allTableTd = document.querySelectorAll("td");
    for (td of allTableTd) {
        if (td.innerText === fullUrl) return true;
    }
    return false;
}