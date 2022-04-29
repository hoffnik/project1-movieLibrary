// API Url: https://imdb-api.com/en/API/SearchMovie/{apiKey}/{expresssion}
/* var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  fetch('https://imdb-api.com/en/API/Title/k_xuhun4lc/tt1832382', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */

// All global variables

var APIKey = 'k_xuhun4lc'

var htmlMovieEl = document.getElementById('movieData')

// search movie function to target value given in the input field
var searchMovieHandler = function(event) {
    event.preventDefault();

    // add the input name when created in HTML
    var movieSearchInput = document.querySelector('input[name="input-tag-name"]').value;
    // console.log(movieSearchInput); -> check if selection works

    if (!movieSearchInput) {
        alert('Please fill out the search field!');
        return false
    }

    // reset the input field after hitting search
    movieSearchInput.reset();

    // call getMovies function and pass the searched term into function
    getMovies(movieSearchInput);
}

var getMovies = function(movieSearchInput) {
    var requestURL = 'https://imdb-api.com/en/API/SearchMovie/k_xuhun4lc/' + movieSearchInput + 
    
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
        console.log(data.results[i]);
    })
    .catch(function(error) {
        // in case error occurs
        console.log(error);
    })
    
    // 
    var movieObject = data.results[i];
    
    var createMovieEl = function (movieObject) { 
        // create the list div to hold information
        var movieContainerEl = document.createElement('div');
        movieContainerEl.className = 'movie-container';
        // check if needed, was thinking that we might need that to store it in local storage
        movieContainerEl.setAttribute('data-movie-id', movieCounter);

        // create image and parse information from movie element
        // not sure how we would add an alt text, seems like this info is not provided
        movieContainerEl.innerHTML = '<img src="' + movieObject.image + '" width="500" height="600"><h3 class="movie-title">' + movieObject.title + '</h3><span class="movie-rating">' + movieObject.rating + '</span>';
        
        // append to html
        htmlMovieEl.appendChild(movieContainerEl);

    };
}

// search for new movie
movieInput.addEventListener('submit', searchMovieHandler);