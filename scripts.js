/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const FRESH_PRINCE_URL =
  "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL =
  "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL =
  "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let movies = [
  {
    title: "Nezha",
    image: "Nezha_film_poster.jpg", 
    year: 2019,
    genre: "Animation / Fantasy",
    description: "A rebellious boy born as a demon fights against fate to become a hero."
  },
  {
    title: "Kung Fu Panda",
    image: "Kung_Fu_Panda_film_posters.jpg",
    year: 2008,
    genre: "Animation / Action / Comedy",
    description: "An unlikely panda becomes the Dragon Warrior and defends the Valley of Peace."
  },
  {
    title: "Minions",
    image: "minions.jpg", 
    year: 2015,
    genre: "Animation / Comedy",
    description: "The yellow minions search for a new villainous master to serve."
  },
  {
    title: "Avengers: Endgame",
    image: "Avengers_Endgame_Poster.jpg", 
    year: 2019,
    genre: "Action / Sci-Fi / Superhero",
    description: "The Avengers unite to reverse Thanos' actions and restore the universe."
  }
];

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function loadMovies() {
  const saved = localStorage.getItem("movieData");
  if (saved) {
    movies = JSON.parse(saved);
  }
}

function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let movie of movies) {
    const newCard = templateCard.cloneNode(true);
    newCard.style.display = "block";
    newCard.querySelector("h2").textContent = movie.title;
    const imgElement = newCard.querySelector("img");
    imgElement.setAttribute("src", movie.image);
    imgElement.setAttribute("alt", movie.title + " Poster");
    const list = newCard.querySelector("ul");
    list.innerHTML = `
      <li><strong>Year:</strong> ${movie.year}</li>
      <li><strong>Genre:</strong> ${movie.genre}</li>
      <li>${movie.description}</li>
    `;
    cardContainer.appendChild(newCard);
  }
}


function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  loadMovies();
  showCards();
});
function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  if (movies.length === 0) {
    alert("No more movies to remove!");
    return;
  }
  movies.pop();
  localStorage.setItem("movieData", JSON.stringify(movies)); // 可选同步保存
  showCards();
}
function searchMovies() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(input)
  );
  displayFilteredCards(filtered);
}

function displayFilteredCards(filteredMovies) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let movie of filteredMovies) {
    const newCard = templateCard.cloneNode(true);
    newCard.style.display = "block";
    newCard.querySelector("h2").textContent = movie.title;
    newCard.querySelector("img").src = movie.image;
    newCard.querySelector("img").alt = movie.title + " Poster";

    const list = newCard.querySelector("ul");
    list.innerHTML = `
      <li><strong>Year:</strong> ${movie.year}</li>
      <li><strong>Genre:</strong> ${movie.genre}</li>
      <li>${movie.description}</li>
    `;
    cardContainer.appendChild(newCard);
  }
}
function addMovie() {
  // 1. Get the value of the input box
  const title = document.getElementById("new-title").value;
  const image = document.getElementById("new-image").value;
  const year = parseInt(document.getElementById("new-year").value);
  const genre = document.getElementById("new-genre").value;
  const description = document.getElementById("new-description").value;

  // 2. Simple validation (make sure it's not empty)
  if (!title || !image || !year || !genre || !description) {
    alert("Please fill out all fields!");
    return;
  }

  // 3. Constructing a new movie object
  const newMovie = {
    title: title,
    image: image,
    year: year,
    genre: genre,
    description: description
  };

  // 4. Add the array and refresh the page
  movies.push(newMovie);
  showCards();
  localStorage.setItem("movieData", JSON.stringify(movies));


  // 5. clean form
  document.getElementById("new-title").value = "";
  document.getElementById("new-image").value = "";
  document.getElementById("new-year").value = "";
  document.getElementById("new-genre").value = "";
  document.getElementById("new-description").value = "";
}
let sortAscending = true;

function sortMoviesByYear() {
  if (sortAscending) {
    movies.sort((a, b) => a.year - b.year); // 升序
  } else {
    movies.sort((a, b) => b.year - a.year); // 降序
  }
  sortAscending = !sortAscending;
  showCards();
}
