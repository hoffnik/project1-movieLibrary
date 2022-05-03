var searchTv = document.getElementById('searchTv')
var show = document.getElementById('tv')
var searchMov = document.getElementById('searchMov')
var movie = document.getElementById('movie')
var main = document.getElementById('main')

function getShows() {
    var tvAPI = "https://api.tvmaze.com/search/shows?q=";
    var tvUrl = tvAPI + show.value
    main.innerHTML = ""

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
            showTitle = data[i].show.name
            showRating = data[i].show.rating.average

            showImg.classList.add('img')
            showInfo.classList.add('info')
            showEl.classList.add('movie-show')

            showInfo.append(showTitle,showRating)
            showEl.append(showImg,showInfo)
            main.appendChild(showEl)
        }
    })
    
};

searchTv.addEventListener("click", getShows)

// movie API part
// globale variables
var htmlMovieEl = document.getElementById('main');
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

$( "#searchMov" ).click(function(movieSearchInput) {

    var movieAPI = 'http://www.omdbapi.com/?apikey=b1a91290&s='

    var movieSearchInput = document.getElementById('movie').value.trim();
    var movieURL = movieAPI + movieSearchInput
    main.innerHTML = ''
    // fetch the API
    fetch(movieURL, requestOptions)
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
                console.log(data.Search[i].Title);
                    // create the list div to hold information
                    var movieEl = document.createElement('div')
                    var movieImg = document.createElement('img')
                    var movieInfo = document.createElement('div')
                    var movieTitle = document.createElement('h3')
                    var movieRating = document.createElement('span')
                    var movieExpand = document.createElement('div')
                
                    movieRating = data.Search[i].Rating
                    movieImg.src = data.Search[i].Poster
                    movieTitle = data.Search[i].Title
                    movieExpand = data.Search[i].Title
                    // movieRating = 
    
                    movieImg.classList.add('img')
                    movieInfo.classList.add('info')
                    movieEl.classList.add('movie-show')
                    // movieExpand.setAttribute('id', 'accordion')
    
                    movieInfo.append(movieTitle)
                    movieEl.append(movieImg,movieInfo)
                    htmlMovieEl.appendChild(movieEl)
            
        };
    });
});
