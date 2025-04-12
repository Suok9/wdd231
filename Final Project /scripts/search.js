

// Replace with your actual TMDb API key
const API_KEY = '262790dcf12cf40b2e9b7125fcefd041';

// Function to search for movies using TMDb API
async function searchMovies() {
  const query = document.getElementById('movie-search').value.trim();
  const resultsContainer = document.getElementById('movie-results');
  resultsContainer.innerHTML = '';  // Clear previous results
  
  if (query.length === 0) {
    return;  // If input is empty, do nothing
  }

  try {
    // Fetch movie data from TMDb API
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // If results are found, display them
      data.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        // Create movie content elements
        const title = document.createElement('h3');
        title.textContent = movie.title;

        const poster = document.createElement('img');
        poster.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'; // Default image if no poster

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${movie.release_date}`;

        const description = document.createElement('p');
        description.textContent = `Description: ${movie.overview || 'No description available.'}`;

        // Append elements to movieDiv
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(description);

        // Append movieDiv to the results container
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
  
  document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;