const submitButton = document.querySelector("#submit-button");
const fullURL = document.querySelector("#url-input");
const HOST = "http://localhost:3001/api/shorturl"
submitButton.addEventListener("click", postRequest)
submitButton.addEventListener("click", () => fullURL.value = "")
async function postRequest() {
    const urlToShorten = {"fullUrl": fullURL.value};
    const options = { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"fullUrl": fullURL.value}, null, 2)
    };
    try {
        const response = await fetch(`http://localhost:3001/api/shorturl`, options)
        const serverResponse = await response.json();
        if (Object.keys(serverResponse).includes("Error")) {
            alert(serverResponse["Error"]);
        } else {
            addNewUrlToTable(urlToShorten["fullUrl"] ,serverResponse["shortUrl"])
        }

        if (response.status !== 200) {
            console.log(response.status);
            throw new Error(response.status)
        }
    } catch(e) {
        console.error(`${e}. There is a problem with the ${options.method} request`);
        alert("All apologizes, invalid URL :(")
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
        index === 1 ? aTag.setAttribute("href", `${HOST}/${url}`) : aTag.setAttribute("href", url); 
    })
}