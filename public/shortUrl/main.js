const submitButton = document.querySelector("#submit-button");
const tableBody = document.querySelector(".table-body-row");
const fullURL = document.querySelector("#url-input");
const deleteButton = document.getElementById("delete-button")
const HOST = "http://localhost:3001"

submitButton.addEventListener("click", () => {
    fullUrlPostRequest({"fullUrl": fullURL.value})});
submitButton.addEventListener("click", () => fullURL.value = "");
deleteButton.addEventListener("click", async () => {
    if (confirm("Warning! this action will delete all URLs from the database")) {
        await deleteAll();
        cleanUrlTable();
        return;
    } 
    return;
})
window.addEventListener("load", retriviedData);