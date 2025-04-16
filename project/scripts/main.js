import { genreList } from './genres.js';

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const API_KEY = '262790dcf12cf40b2e9b7125fcefd041';
const form = document.getElementById('pref-form');
const resultsSection = document.getElementById('results');

document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const genreSelect = document.getElementById('genres');
  
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    if (navMenu.classList.contains("active")) {
      menuToggle.textContent = "✖";
    } else {
      menuToggle.textContent = "☰";
    }
  });
  
  genreList.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
  
  const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
  if (savedPrefs) {
    savedPrefs.genres.forEach(savedId => {
      const option = genreSelect.querySelector(`option[value="${savedId}"]`);
      if (option) option.selected = true;
    });
    document.getElementById('min-rating').value = savedPrefs.minRating;
    document.getElementById('type').value = savedPrefs.type;
  }
  
  const sampleContent = document.createElement('div');
  sampleContent.innerHTML = '<p>Welcome to EZRAVIDS! Explore personalized movie & series suggestions.</p>';
  openModal(sampleContent);
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const genres = Array.from(document.getElementById('genres').selectedOptions).map(option => option.value);
    const minRating = parseFloat(document.getElementById('min-rating').value);
    const type = document.getElementById('type').value;
    const userPreferences = { genres, minRating, type };
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    let url = `results.html?genres=${genres.map(encodeURIComponent).join(',')}&minRating=${encodeURIComponent(minRating)}&type=${encodeURIComponent(type)}`;
    window.location.href = url;
  });
});

async function getRecommendations(genres, minRating, type) {
  try {
    const genreString = genres.join(',');
    const url = `https:
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      displayRecommendations(data.results);
    } else {
      console.error('No results found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayRecommendations(data) {
  if (!resultsSection) return;
  resultsSection.innerHTML = '';
  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('recommendation-item');
    const title = document.createElement('h3');
    title.textContent = item.title || item.name;
    const description = document.createElement('p');
    description.textContent = ` //api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genreString}&vote_average.gte=${minRating}&sort_by=popularity.desc&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      displayRecommendations(data.results);
    } else {
      console.error('No results found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayRecommendations(data) {
  if (!resultsSection) return;
  resultsSection.innerHTML = '';
  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('recommendation-item');
    const title = document.createElement('h3');
    title.textContent = item.title || item.name;
    const description = document.createElement('p');
    description.textContent = `Description: ${item.overview}`;
    const rating = document.createElement('p');
    rating.textContent = `Rating: ${item.vote_average}`;
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${item.release_date || item.first_air_date}`;
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    posterImg.alt = `${item.title || item.name} Poster`;
    itemDiv.appendChild(title);
    itemDiv.appendChild(description);
    itemDiv.appendChild(rating);
    itemDiv.appendChild(releaseDate);
    itemDiv.appendChild(posterImg);
    resultsSection.appendChild(itemDiv);
  });
}


function openModal(content) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '❌';
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}
