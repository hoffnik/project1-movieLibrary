// var searchTv = document.getElementById('searchTv')
var show = document.getElementById('tv')
var tvForm = document.getElementById('tvForm')
// var searchMov = document.getElementById('searchMov')
var movie = document.getElementById('movie')
var movieForm = document.getElementById('movieForm')
var main = document.getElementById('main')
// var for modal
var modal = document.getElementById("myModal");

var pagePlaceHolder = function(event) {
    event.preventDefault();
    main.innerHTML = ""
    var placeAPI = "https://imdb-api.com/en/API/MostPopularMovies/k_xuhun4lc";

    fetch(placeAPI)
        .then(function (response){
            if (response.status !== 200) {
                document.location.status.replace('./404.html')
            } else {
                return response.json();
            } 
        })
        .then(function(data){
            loadTopMovies(data);
            console.log(data);
        });
};

var loadTopMovies = function(movies) {
    for (i=0; i < movies.items.length; i++) {
        // create container for each movie
        var movieContainerEl = document.createElement('div');
        movieContainerEl.classList = 'movie-show';

        // create link for each movie
        var movieId = movies.items[i].id;
        var movieImageEl = document.createElement('a');
        movieImageEl.className = 'movie-container';
        movieImageEl.setAttribute("href", "./details.html?movieid=" + movieId);

        // create image element
        var movImg = document.createElement('img');
        movImg.setAttribute("src", movies.items[i].image)
        movImg.classList = 'img';

        // create title element
        var movTitle = document.createElement('h3');
        movTitle.textContent = movies.items[i].fullTitle;
        
        // create year element
        var movRating = document.createElement('span');
        movRating.textContent = movies.items[i].imDbRating;

        // create info div for title and year styling
        var movieInfo = document.createElement('div')
        movieInfo.append(movTitle, movRating)
        movieInfo.classList.add('info')

       // append to link
        movieImageEl.append(movImg, movieInfo);
       
        // append to container
        movieContainerEl.append(movieImageEl);

        // append container to DOM
        htmlMovieEl.appendChild(movieContainerEl);

        // add NA in place of blank scores
        if (movies.items[i].imDbRating == "") {
            movRating.innerHTML = 'NA'
        }
    }
};

window.addEventListener('load', pagePlaceHolder);

// Load home page with top movies on click of website name
var home = document.getElementById('home')
home.addEventListener('click', pagePlaceHolder)

function getShows(event) {
    if (tvForm == "") {
        modal.style.display = "block";
    }
    event.preventDefault();
    var tvAPI = "https://api.tvmaze.com/search/shows?q=";
    var tvUrl = tvAPI + show.value
    console.log(tvUrl)
    main.innerHTML = ""

    console.log(tvUrl)
    fetch(tvUrl)
        .then(function (response){
            if (response.status !== 200) {
                document.location.status.replace('./404.html')
            } else {
                // convert to JSON object
                return response.json();
                console.log(response);
            } 
        })
        .then(function(data){
            console.log(data)
            
        for (i=0; i < data.length; i++) {
            var showEl = document.createElement('div')
            var showImg = document.createElement('img')
            var showInfo = document.createElement('div')
            var tvExpand = document.createElement('div')
            var expandTitle = document.createElement('h3')
            var expandInfo = document.createElement('span')
            var showTitle = document.createElement('h3')
            var showRating = document.createElement('span')
        
            showImg.src = data[i].show.image.medium
            showTitle.innerHTML = data[i].show.name
            showRating.innerHTML = data[i].show.rating.average
            expandTitle.innerHTML = 'More Info'
            expandInfo.innerHTML = 'This is where further information will be added once second api works properly'

            if (data[i].show.rating.average == null) {
                showRating.innerHTML = 'NA'
            }

            showImg.classList.add('img')
            showInfo.classList.add('info')
            showEl.classList.add('movie-show')
            expandInfo.classList.add('expand')
            tvExpand.setAttribute('id', 'accordion')

            showInfo.append(showTitle, showRating)
            tvExpand.append(expandTitle, expandInfo)
            showEl.append(showImg, showInfo, tvExpand)
            main.appendChild(showEl)

            $(function() {
                $( "#accordion" ).accordion({
                collapsible: true,
                active: false
                });
            });
        }
    })
    
};

show.addEventListener("keyup", getShows)
tvForm.addEventListener('submit', getShows)

// ___________movie API part______________________________________
// globale variables
var htmlMovieEl = document.getElementById('main');

function getMovies(event) {
    event.preventDefault();
    var movieSearchInput = document.getElementById('movie').value;
    var movieAPI = 'https://www.omdbapi.com/?apikey=b1a91290&type=movie&s='
    var movieURL = movieAPI + movieSearchInput
    main.innerHTML = ""

    fetch(movieURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                    displayMovies(data);
                })
            } else {
                document.location.status.replace('./404.html')
            } 
        })
        .catch(function(error) {
            alert("Unable to connect to API")
        });
};

var displayMovies = function(movies) {
    for(var i = 0; i< movies.Search.length; i++) {
        /* var id = movies.Search[i].imdbID
        console.log(id) */

        // create container for each movie
        var movieContainerEl = document.createElement('div');
        movieContainerEl.classList = 'movie-show';

        // create link for each movie
        var movieId = movies.Search[i].imdbID;
        var movieImageEl = document.createElement('a');
        movieImageEl.className = 'movie-container';
        movieImageEl.setAttribute("href", "./details.html?movieid=" + movieId);

        // create image element
        var movImg = document.createElement('img');
        movImg.setAttribute("src", movies.Search[i].Poster)
        movImg.classList = 'img';

        // create title element
        var movTitle = document.createElement('h3');
        movTitle.innerHTML = movies.Search[i].Title;
        
        // create year element
        var movYear = document.createElement('h3');
        movYear.innerHTML = movies.Search[i].Year;

        // append title and year to movInfo for styling
        var movInfo = document.createElement('div')
        movInfo.append(movTitle, movYear)
        movInfo.classList.add('info');

       // append to link
        movieImageEl.append(movImg, movInfo);
       
        // append to container
        movieContainerEl.append(movieImageEl);

        // append container to DOM
        htmlMovieEl.appendChild(movieContainerEl);

        // hide movie results that do not have posters
        if (movies.Search[i].Poster == "N/A") {
            movieContainerEl.style.display = "none"
        }
    }    
};

movie.addEventListener("keyup", getMovies)
movieForm.addEventListener('submit', getMovies)