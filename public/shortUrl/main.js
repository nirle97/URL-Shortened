const submitButton = document.querySelector("#submit-button");
const fullURL = document.querySelector("#url-input");
const HOST = "http://localhost:3001"

submitButton.addEventListener("click", () => {
    fullUrlPostRequest({"fullUrl": fullURL.value})});
submitButton.addEventListener("click", () => fullURL.value = "");