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

// call movie function
$( "#searchMov" ).click(function(movieSearchInput) {
    // get movieAPI
    var movieAPI = 'https://imdb-api.com/en/API/SearchMovie/k_xuhun4lc/'
    var movieSearchInput = document.getElementById('movie').value;
    console.log(movieSearchInput);
    var movieURL = movieAPI + movieSearchInput
console.log(movieURL);

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
    
            for(var i = 0; i< data.results.length; i++) {
                console.log(data.results[i].title);
                // create the list div to hold information
                var movieContainerEl = document.createElement('div');
                movieContainerEl.className = 'movie-container';
                // check if needed, was thinking that we might need that to store it in local storage
                // movieContainerEl.setAttribute('data-movie-id', movieCounter);
        
                // create image and parse information from movie element
                // not sure how we would add an alt text, seems like this info is not provided
                movieContainerEl.innerHTML = '<img src="' + data.results[i].image + '" width="500" height="600"><h3 class="movie-title">' + data.results[i].title + '</h3><span class="movie-rating">' + data.results[i].rating + '</span>';
                
                // append to html
                htmlMovieEl.appendChild(movieContainerEl);
    
        };
    });
});
