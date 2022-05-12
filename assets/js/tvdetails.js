var titleImage = document.querySelector('#tv-image');
var tvTitle = document.querySelector('#tv-title');
var tvDescription = document.querySelector('#description');
var tvYear = document.querySelector('#year');
var tvGenre = document.querySelector('#genre');
var tvLength = document.querySelector('#length');
var tvRating = document.querySelector('#rating');

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
    tvTitle.textContent = show.name;
    tvDescription.innerHTML = show.summary;
    tvYear.textContent = "Premiered: " + show.premiered;
    tvGenre.textContent = show.genres[0];
    tvLength.textContent = "Runtime: " + show.averageRuntime + "mins";
    tvRating.textContent = show.rating.average;
}

getTvID();
