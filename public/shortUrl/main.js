const submitButton = document.querySelector("#submit-button");
const fullURL = document.querySelector("#url-input");
const HOST = "http://localhost:3001"

submitButton.addEventListener("click", fullUrlPostRequest)
submitButton.addEventListener("click", () => fullURL.value = "")

async function fullUrlPostRequest(fullUrlObj) {
    const urlToShorten = {"fullUrl": fullURL.value};
    const options = { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(urlToShorten, null, 2)
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
