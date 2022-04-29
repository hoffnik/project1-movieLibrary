var searchTv = document.getElementById('searchTv')
var show = document.getElementById('tv')
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
            var showTitle = document.createElement('h3')
            var showRating = document.createElement('span')
        
            showImg.src = data[i].show.image.medium
            showTitle = data[i].show.name
            showRating = data[i].show.rating.average
        
            showEl.append(showImg,showTitle,showRating)
            main.appendChild(showEl)
        }
    })
    
};

searchTv.addEventListener("click", getShows)

