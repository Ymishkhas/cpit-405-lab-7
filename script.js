// Grap elements
const xhrSearchBtn = document.getElementById("xhrSearch");
xhrSearchBtn.addEventListener("click", searchUsingXHR);
const fetchSearchBtn = document.getElementById("fetchSearch");
fetchSearchBtn.addEventListener("click", searchUsingFetchPromises);
const fetchAsyncAwaitBtn = document.getElementById("fetchAsyncAwaitSearch");
fetchAsyncAwaitBtn.addEventListener("click", searchUsingFetchAsynAwait);

const searchQuery = document.getElementById("queryInput");

// Request URL
const Orientation = "portrait";
const per_page = "20";
const API_URL = `https://api.unsplash.com/search/photos?orientation=${Orientation}&per_page=${per_page}`;
const ACCESS_KEY = "4z3NaVTf-nxZiNrhyzXsUHkm7Gwfz7d4fvgGsTLXawQ";


// search using XMLHTTPRequest
function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL + `&query=${queryTerm}`);
    xhr.setRequestHeader("Authorization", `Client-ID ${ACCESS_KEY}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseText = xhr.responseText;
            let responseObj = JSON.parse(responseText);
            console.log(responseObj)
            createImages(responseObj);
        }
    }
    
    xhr.send();
}

// search using fetch with promises
function searchUsingFetchPromises() {
    let queryTerm = searchQuery.value.trim();

    fetch(API_URL + `&query=${queryTerm}`, {
        method: "GET",
        headers: {
            "Authorization": `Client-ID ${ACCESS_KEY}`,
        }
    }).then( (response) => {
        return response.json();
    }).then( (responseObj) => {
        createImages(responseObj);
    })
}

// search using fetchAsynAwait
async function searchUsingFetchAsynAwait() {
    let queryTerm = searchQuery.value.trim();

    let response = await fetch(API_URL + `&query=${queryTerm}`, {
        method: "GET",
        headers: {
            "Authorization": `Client-ID ${ACCESS_KEY}`,
        }
    })
    
    if(response.ok) {
        const responseObj = await response.json()
        createImages(responseObj);
    }
}

function createImages(data) {
    const resultsElm = document.getElementById("results");
    resultsElm.innerHTML = "";

    // Loop through the result
    for (let item of data.results) {
        let imgElm = document.createElement("img");
        imgElm.src = item.urls.small;
        imgElm.alt = item.alt_description;
        resultsElm.appendChild(imgElm);
    }
}