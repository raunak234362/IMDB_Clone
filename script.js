//Example - http://www.omdbapi.com/?i=tt3896198&apikey=84ff5c1b

//API Key for OMDB API
const key = '84ff5c1b';

// references to HTML elements
var searchInput = document.getElementById('Input');
var displaySearchList = document.getElementsByClassName('fav-container');

// Fetch and log movie data for an example movie using OMDB API
fetch('http://www.omdbapi.com/?i=tt3896198&apikey=84ff5c1b')
    .then(res => res.json())
    .then(data => console.log(data));

// Add an event listener to the search input field to trigger movie search
searchInput.addEventListener('input', findMovies);

// Function to display details of a single movie
async function singleMovie() {
   // Get the movie ID from the URL query parameters
    var urlQueryParams = new URLSearchParams(window.location.search);
    var id = urlQueryParams.get('id')
    console.log(id);

    // Build the API URL for the specific movie using its ID
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`
    
     // Fetch movie data and log it
    const res = await fetch(`${url}`);
    const data = await res.json();
    console.log(data);
    console.log(url);

    // HTML output for displaying the movie details
    var output = `

    <div class="movie-poster">
        <img src=${data.Poster} alt="Movie Poster">
    </div>
    <div class="movie-details">
        <div class="details-header">
            <div class="dh-ls">
                <h2>${data.Title}</h2>
            </div>
        </div>
        <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span style="font-size: 18px;">${data.imdbRating}</span>/10 </i></span>
        <ul class="details-ul">
            <li><strong>Actors : </strong>${data.Actors}</li>
            <li><strong>Director : </strong>${data.Director}</li>
            <li><strong>Writers : </strong>${data.Writer}</li>
            <li><strong>Genre : </strong>${data.Genre}</li>
            <li><strong>Release Date : </strong>${data.DVD}</li>
            <li><strong>Box Office : </strong>${data.BoxOffice}</li>
            <li><strong>Movie Runtime : </strong>${data.Runtime}</li>
        </ul>
        <p style="font-size: 18px; margin-top:10px;">${data.Plot}</p>
        <p style="font-size: 15px; font-style: italic; color: #fff; margin-top: 10px;">
            <i class="fa-solid fa-award"></i>
            &thinsp; ${data.Awards}
        </p>
    </div> 
    `
   // Display the movie details in the document
    document.querySelector('.movie-container').innerHTML = output

}

// Function to display a list of movies
async function displayMovieList(movies) {
    var output = '';
   
    for (i of movies) {
        // Check if a movie poster is available, otherwise use a placeholder
        var img = '';
        if (i.Poster != 'N/A') {
            img = i.Poster;
        }
        else {
            img = 'img/blank-poster.webp';
        }
        var id = i.imdbID;

       // HTML for displaying each movie in the list
        output += `

        <div class="fav-item">
            <div class="fav-poster">
            <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name"><a href="movie.html?id=${id}">${i.Title}</a></p>
                        <p class="fav-movie-rating"><a href="movie.html?id=${id}">${i.Year}</a></p>
                    </div>
                </div>
            </div>
        </div>

       `
    }
     // Display the movie list in the document
    document.querySelector('.fav-container').innerHTML = output;
    console.log("here is movie list ..", movies);
}



// Function to search for movies based on user input
async function findMovies() {
     // Construct the OMDB API URL for searching movies using user input
    const url = `https://www.omdbapi.com/?s=${(searchInput.value).trim()}&page=1&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();

    if (data.Search) {
        // Display the search results in the document
        displayMovieList(data.Search)
    }
}

// Function to load and display favorite movies from localStorage
async function MovieLoader() {

    var output = ''
     // Iterate through localStorage to get favorite movie IDs
    for (i in localStorage) {
        var id = localStorage.getItem(i);
        if (id != null) {
            // Construct the API URL for each favorite movie
            const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`
            const res = await fetch(`${url}`);
            const data = await res.json();
            console.log(data);


            var img = ''
            if (data.Poster) {
                img = data.Poster
            }
            else { img = data.Title }
            var Id = data.imdbID;

            // HTML for displaying each favorite movie
            output += `

        <div class="fav-item">
            <div class="fav-poster">
                <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-rating">${data.Year} &middot; <span
                                style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span>/10</p>
                    </div>
                    <div style="color: maroon">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removeFromfavorites('${Id}')></i>
                    </div>
                </div>
            </div>
        </div>

       `;
        }

    }
       // Display the favorite movies in the document
    document.querySelector('.fav-container').innerHTML = output;
}


