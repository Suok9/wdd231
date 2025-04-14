const API_KEY = '262790dcf12cf40b2e9b7125fcefd041';

async function searchMovies() {
  const query = document.getElementById('movie-search').value.trim();
  if (query.length === 0) return;

  saveSearchHistory(query);
  renderSearchHistory();

  const resultsContainer = document.getElementById('movie-results');
  resultsContainer.innerHTML = '';

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      data.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const poster = document.createElement('img');
        poster.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150';

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${movie.release_date}`;

        const description = document.createElement('p');
        description.textContent = `Description: ${movie.overview || 'No description available.'}`;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(description);

        movieDiv.addEventListener('click', () => showMovieDetails(movie));

        resultsContainer.appendChild(movieDiv);
      });
    } else {
      resultsContainer.innerHTML = '<p>No results found. Please try again.</p>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
  }
}

function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }
}

function renderSearchHistory() {
  const container = document.getElementById('search-history');
  container.innerHTML = '';

  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  history.forEach(item => {
    const tag = document.createElement('span');
    tag.textContent = item;
    tag.addEventListener('click', () => {
      document.getElementById('movie-search').value = item;
      searchMovies();
    });
    container.appendChild(tag);
  });
}

function showMovieDetails(movie) {
  const modal = document.getElementById('movie-modal');
  const details = document.getElementById('modal-details');
  details.innerHTML = `
    
    <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300'}" style="width:100%; max-height:400px; object-fit:cover;">
    <h2><a href="https://kimoitv.com/search/?q=${movie.title}">${movie.title}</a></h2>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Overview:</strong> ${movie.overview || 'No description available.'}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
  `;
  modal.style.display = 'block';
}

document.getElementById('close-modal').onclick = function () {
  document.getElementById('movie-modal').style.display = 'none';
};

window.onclick = function (event) {
  const modal = document.getElementById('movie-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.addEventListener("DOMContentLoaded", function () {
  renderSearchHistory();

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
  });
});


