document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("active");
  });
  

// TMDb API key (replace with your actual key)
const API_KEY = '262790dcf12cf40b2e9b7125fcefd041'; // Replace with your TMDb API key

// Function to search for TV series
function searchSeries() {
  const seriesSearchTerm = document.getElementById('series-search').value;

  if (seriesSearchTerm) {
    // Fetch data from TMDb API for TV series
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${seriesSearchTerm}&page=1`)
      .then(response => response.json())
      .then(data => {
        displaySeriesResults(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } else {
    alert('Please enter a TV series name');
  }
}

// Function to display the series search results
function displaySeriesResults(seriesData) {
  const resultsContainer = document.getElementById('series-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (seriesData && seriesData.length > 0) {
    seriesData.forEach(series => {
      const seriesDiv = document.createElement('div');
      seriesDiv.classList.add('movie');

      const posterImg = document.createElement('img');
      posterImg.src = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
      posterImg.alt = `${series.name} Poster`;

      const title = document.createElement('h3');
      title.textContent = series.name;

      const description = document.createElement('p');
      description.textContent = series.overview || 'No description available.';

      const releaseDate = document.createElement('p');
      releaseDate.textContent = `First Aired: ${series.first_air_date || 'N/A'}`;

      // Append elements to the series container
      seriesDiv.appendChild(posterImg);
      seriesDiv.appendChild(title);
      seriesDiv.appendChild(description);
      seriesDiv.appendChild(releaseDate);

      resultsContainer.appendChild(seriesDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>No results found. Please try again with a different search.</p>';
  }
}