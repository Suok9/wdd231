document.addEventListener("DOMContentLoaded", function () {
  renderSearchHistory();

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
  });

  
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

const API_KEY = '262790dcf12cf40b2e9b7125fcefd041';

function searchSeries() {
  const seriesSearchTerm = document.getElementById('series-search').value.trim();

  if (seriesSearchTerm) {
    saveSearchHistory(seriesSearchTerm); 
    renderSearchHistory(); 

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(seriesSearchTerm)}&page=1`)
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

function displaySeriesResults(seriesData) {
  const resultsContainer = document.getElementById('series-results');
  resultsContainer.innerHTML = '';

  if (seriesData && seriesData.length > 0) {
    seriesData.forEach(series => {
      const seriesDiv = document.createElement('div');
      seriesDiv.classList.add('movie');

      const posterImg = document.createElement('img');
      posterImg.src = series.poster_path ?
        `https://image.tmdb.org/t/p/w500${series.poster_path}` :
        'placeholder.jpg'; 
        
      posterImg.alt = `${series.name} Poster`;

      const title = document.createElement('h3');
      title.textContent = series.name;

      const description = document.createElement('p');
      description.textContent = series.overview || 'No description available.';

      const releaseDate = document.createElement('p');
      releaseDate.textContent = `First Air Date: ${series.first_air_date || 'Unknown'}`;

      seriesDiv.appendChild(posterImg);
      seriesDiv.appendChild(title);
      seriesDiv.appendChild(description);
      seriesDiv.appendChild(releaseDate);

      resultsContainer.appendChild(seriesDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>No TV series found.</p>';
  }
}

function getYearAndLastModified() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const lastModified = document.lastModified;

  return {
    currentYear: currentYear,
    lastModified: lastModified
  };
}


const info = getYearAndLastModified();
console.log("Current Year:", info.currentYear);
console.log("Last Modified:", info.lastModified);


document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = getYearAndLastModified().currentYear;
  }
});

function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem('seriesSearchHistory')) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 10) {
      history.pop(); 
    }
    localStorage.setItem('seriesSearchHistory', JSON.stringify(history));
  }
}

function renderSearchHistory() {
  const container = document.getElementById('search-history');
  if (!container) return; 
  
  container.innerHTML = '';

  const history = JSON.parse(localStorage.getItem('seriesSearchHistory')) || [];
  if (history.length > 0) {
    const historyTitle = document.createElement('h4');
    historyTitle.textContent = 'Search History:';
    container.appendChild(historyTitle);

    history.forEach(item => {
      const tag = document.createElement('span');
      tag.classList.add('search-history-item'); 
      
      tag.textContent = item;
      tag.addEventListener('click', () => {
        document.getElementById('series-search').value = item;
        searchSeries();
      });
      container.appendChild(tag);
    });
  }
}
