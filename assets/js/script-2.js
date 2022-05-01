// globale variables
var movieSearchInput = document.querySelector('input[id="movie"]').value;
var htmlMovieEl = document.getElementById('main');

// call movie function
$( "#searchMov" ).click(function(movieSearchInput) {
    // get movieAPI
    var movieURL = 'https://imdb-api.com/en/API/SearchMovie/k_xuhun4lc/' + movieSearchInput
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