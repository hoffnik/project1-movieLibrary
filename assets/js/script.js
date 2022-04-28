// API Url: https://imdb-api.com/en/API/SearchMovie/{apiKey}/{expresssion}

// API Key : k_xuhun4lc

/* var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  fetch('https://imdb-api.com/en/API/Title/k_xuhun4lc/tt1832382', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */

var requestURL = 'https://imdb-api.com/en/API/SearchMovie/k_xuhun4lc/inception'

fetch(requestURL)
.then(function(response) {
    if (response.status !== 200) {
        document.location.status.replace('./404.html')
    } else {
        // convert to JSON object
        return response.json();
        console.log(response);
    }
})
.then(function(data){
    // display data in console, change to according HTML element later
    console.log(data);
})
.catch(function(error) {
    // in case error occurs
    console.log(error);
})