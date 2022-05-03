// var searchTv = document.getElementById('searchTv')
var show = document.getElementById('tv')
var tvForm = document.getElementById('tvForm')
// var searchMov = document.getElementById('searchMov')
var movie = document.getElementById('movie')
var movieForm = document.getElementById('movieForm')
var main = document.getElementById('main')

function getShows(event) {
    event.preventDefault();
    var tvAPI = "https://api.tvmaze.com/search/shows?q=";
    var tvUrl = tvAPI + show.value
    main.innerHTML = ""

    console.log(tvUrl)
    fetch(tvUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            
        for (i=0; i < data.length; i++) {
            console.log(data[i].show.name)
            var showEl = document.createElement('div')
            var showImg = document.createElement('img')
            var showInfo = document.createElement('div')
            var showTitle = document.createElement('h3')
            var showRating = document.createElement('span')
        
            showImg.src = data[i].show.image.medium
            showTitle.innerHTML = data[i].show.name
            showRating.innerHTML = data[i].show.rating.average

            showImg.classList.add('img')
            showInfo.classList.add('info')
            showEl.classList.add('movie-show')

            showInfo.append(showTitle, showRating)
            showEl.append(showImg, showInfo)
            main.appendChild(showEl)
        }
    })
    
};

show.addEventListener("keyup", getShows)
tvForm.addEventListener('submit', getShows)

// movie API part
// globale variables
var movieSearchInput = document.querySelector('input[id="movie"]').value;
var htmlMovieEl = document.getElementById('main');

//movie function
function getMovies(event) {
    event.preventDefault();
    // get movieAPI
    // var movieAPI = 'https://imdb-api.com/en/API/SearchMovie/k_xuhun4lc/'
    var movieAPI = 'http://www.omdbapi.com/?apikey=b1a91290&s='
    var movieURL = movieAPI + movie.value
    main.innerHTML = ""

    console.log(movieURL)
    // fetch the API
    fetch(movieURL)
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
            console.log(data)
    
            for(var i = 0; i< data.Search.length; i++) {
                console.log(data.Search[i].title);
                // create the list div to hold information
                var movieContainerEl = document.createElement('div');
                movieContainerEl.className = 'movie-container';
                // check if needed, was thinking that we might need that to store it in local storage
                // movieContainerEl.setAttribute('data-movie-id', movieCounter);
        
                // create image and parse information from movie element
                // not sure how we would add an alt text, seems like this info is not provided
                var movEl = document.createElement('div')
                var movImg = document.createElement('img')
                var movInfo = document.createElement('div')
                var movTitle = document.createElement('h3')
                var movRating = document.createElement('span')
            
                movImg.src = data.Search[i].Poster
                movTitle.innerHTML = data.Search[i].Title
                movRating.innerHTML = data.Search[i].imdbRating

                console.log(movImg.src)

                movImg.classList.add('img')
                movInfo.classList.add('info')
                movEl.classList.add('movie-show')

                // append to html
                movInfo.append(movTitle, movRating)
                movEl.append(movImg, movInfo)
                main.appendChild(movEl)
                
                
    
        };
    });
};

movie.addEventListener("keyup", getMovies)
movieForm.addEventListener('submit', getMovies)

// local storage

function watchlist() {
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
    }
    else {
        localStorage.clickcount = 1; 
    }
    document.getElementById("demo").innerHTML = localStorage.clickcount;
}


localStorage.clear()
