var titleImage = document.querySelector('#movie-image');
var movieTitle = document.querySelector('#movie-title');
var movieDescription = document.querySelector('#description');
var movieYear = document.querySelector('#year');
var movieGenre = document.querySelector('#genre');
var movieLength = document.querySelector('#length');
var movieRating = document.querySelector('#rating');
var actorListEl = document.querySelector('#actors-list');

var getMovieID = function() {
    // grab movie id from URl query string
    var queryString = document.location.search;
    var movieId = queryString.split("=")[1];
    var ApiUrl = 'https://www.omdbapi.com/?apikey=b1a91290&i=' + movieId;

    if(movieId) {
        fetch(ApiUrl).then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    displayMovieInfo(data);
                    console.log(data);
                })
            } else {
                document.location.replace("./index.html");
            }
        });
    }
};

var displayMovieInfo = function(movie) {
    titleImage.setAttribute('src', movie.Poster);
    movieTitle.textContent = movie.Title;
    movieDescription.textContent = movie.Plot;
    movieYear.textContent = 'Year Released: ' + movie.Year;
    movieGenre.textContent = 'Genre: ' + movie.Genre;
    movieLength.textContent = 'Length: ' + movie.Runtime;
    movieRating.textContent = 'Rating: ' + movie.imdbRating;

    var actorsStr = movie.Actors;
    var actorsArr = new Array();
    actorsArr = actorsStr.split(",");

    for(var i = 0; i < actorsArr.length; i++) {
        var listItemEl = document.createElement('li');
        listItemEl.textContent = actorsArr[i];
        actorListEl.appendChild(listItemEl);
    }
};

getMovieID();