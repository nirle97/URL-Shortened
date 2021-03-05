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