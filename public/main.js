const submitButton = document.querySelector("#submit-button");
const fullURL = document.querySelector("#url-input");
submitButton.addEventListener("click", postRequest)
async function postRequest() {
    const urlToSHort = {"full-url": fullURL.value}
    const options = { 
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(urlToSHort)
    };
    try {
        const response = await fetch(`http://localhost:3001/api/shorturl/new`, options)

        if (response.status !== 200) {
            console.log(response.status);
            throw new Error(response.status)
        }
    } catch(e) {
        console.error(`${e} There is a problem with the ${options.method} request`);
        alert("All apologizes, an error occurred :(")
    };
};