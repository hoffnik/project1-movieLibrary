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
    movieYear.textContent = movie.Year;
    movieGenre.textContent = movie.Genre;
    movieLength.textContent = movie.Runtime;
    movieRating.textContent = movie.imdbRating;

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

var getTvID = function () {
    var queryString = document.location.search;
    var tvId = queryString.split("=")[1];
    var tvUrl = 'https://api.tvmaze.com/lookup/shows?thetvdb=' + tvId;

    if(tvId) {
        fetch(tvUrl).then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    displayTvInfo(data);
                    console.log(data);
                })
            } else {
                document.location.replace("./index.html");
            }
        });
    }
};

var displayTvInfo = function(show) {
    titleImage.setAttribute('src', show.image.medium)
    movieTitle.textContent = show.name;
    movieDescription.textContent = show.summary;
    movieYear.textContent = show.premiered;
    movieGenre.textContent = show.genres[0];
    movieLength.textContent = show.averageRuntime;
    movieRating.textContent = show.rating.average;
}

getTvID();
