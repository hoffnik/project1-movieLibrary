// var searchTv = document.getElementById('searchTv')
var show = document.getElementById('tv')
var tvForm = document.getElementById('tvForm')
// var searchMov = document.getElementById('searchMov')
var movie = document.getElementById('movie')
var movieForm = document.getElementById('movieForm')
var main = document.getElementById('main')

var pageContentEl = document.querySelector("#page-content")
var watchlists = [];

var getShowList = function getShows(event) {
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
            var watchList = document.createElement('button')

            showImg.src = data[i].show.image.medium
            showTitle.innerHTML = data[i].show.name
            showRating.innerHTML = data[i].show.rating.average
            watchList.innerHTML = "Add to Watch List"

            showImg.classList.add('img')
            showInfo.classList.add('info')
            showEl.classList.add('movie-show')
            

            showInfo.append(showTitle, showRating)
            showEl.append(showImg, showInfo, watchList)
            main.appendChild(showEl)
            
            watchList.onclick = function () {
                var key = showEl;
        
                console.log(key);
            }
        

        }
        
    })
    
};

show.addEventListener("keyup", getShowList)
tvForm.addEventListener('submit', getShowList)

// movie API part
// globale variables
var movieSearchInput = document.querySelector('input[id="movie"]').value;
var htmlMovieEl = document.getElementById('main');

//movie function
var getMovieList = function getMovies(event) {
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
                var watchList = document.createElement('button')
            
                movImg.src = data.Search[i].Poster
                movTitle.innerHTML = data.Search[i].Title
                movRating.innerHTML = data.Search[i].imdbRating
                watchList.innerHTML = "Add to Watch List"

                console.log(movImg.src)

                movImg.classList.add('img')
                movInfo.classList.add('info')
                movEl.classList.add('movie-show')

                // append to html
                movInfo.append(movTitle, movRating)
                movEl.append(movImg, movInfo, watchList)
                main.appendChild(movEl)
                
            
    
        };
    });
};

movie.addEventListener("keyup", getMovieList)
movieForm.addEventListener('submit', getMovieList)

// local storage


var createwatchListActions = function (watchListId) {
    // create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "watchList-actions";
  
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("watch-list-id", watchListId);
    actionContainerEl.appendChild(deleteButtonEl);
    
  
    return actionContainerEl;
  };

var saveWatchlist = function () {
    localStorage.setItem("watchlists", JSON.stringify(watchlists));
}
var loadWatchlist = function() {
    var savedWatchList = localStorage.getItem("watchlists");
    if (!savedWatchList) {
        return false;
    }
    savedTasks = JSON.parse(savedWatchList);
    for (var i = 0; i < savedWatchlist.length; i++) {
        createWatchListEl(savedWatchList[i]);
    }
}

var deletewatchList = function (watchListId) {
    console.log(watchListId);
    // find task list element with taskId value and remove it
    var watchListSelected = document.querySelector(
      ".watchlist-item[data-task-id='" + watchListId + "']"
    );
    wacthListSelected.remove();
  
    // create new array to hold updated list of tasks
    var updatedwatchListArr = [];
  
    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
        updatedwatchListArr.push(tasks[i]);
      }
    }
  
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveWatchlist();
  };
  

pageContentEl.addEventListener("click", )

loadWatchlist();