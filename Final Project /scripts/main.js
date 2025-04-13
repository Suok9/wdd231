 document.getElementById("year").textContent = new Date().getFullYear();
 document.getElementById("lastModified").textContent = document.lastModified;

 document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
   
   navMenu.classList.toggle("active");

   
   if (navMenu.classList.contains("active")) {
    menuToggle.textContent = "✖";
   } else {
    menuToggle.textContent = "☰";
   }
  });

  
  // Populate genre dropdown dynamically
  const genreList = [
   { id: 28, name: "Action" },
   { id: 12, name: "Adventure" },
   { id: 16, name: "Animation" },
   { id: 35, name: "Comedy" },
   { id: 80, name: "Crime" },
   { id: 99, name: "Documentary" },
   { id: 18, name: "Drama" },
   { id: 10751, name: "Family" },
   { id: 14, name: "Fantasy" },
   { id: 36, name: "History" },
   { id: 27, name: "Horror" },
   { id: 10402, name: "Music" },
   { id: 9648, name: "Mystery" },
   { id: 10749, name: "Romance" },
   { id: 878, name: "Science Fiction" },
   { id: 10770, name: "TV Movie" },
   { id: 53, name: "Thriller" },
   { id: 10752, name: "War" },
   { id: 37, name: "Western" }
  ];
  
  const genreSelect = document.getElementById('genres');
  genreList.forEach(genre => {
   const option = document.createElement('option');
   option.value = genre.id;
   option.textContent = genre.name;
   genreSelect.appendChild(option);
  });
  
  // Restore previous user preferences if any
  const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
  if (savedPrefs) {
   savedPrefs.genres.forEach(savedId => {
    const option = genreSelect.querySelector(`option[value="${savedId}"]`);
    if (option) option.selected = true;
   });
   document.getElementById('min-rating').value = savedPrefs.minRating;
   document.getElementById('type').value = savedPrefs.type;
  }
  
  // Modal on page load
  const sampleContent = document.createElement('div');
  sampleContent.innerHTML = '<p>Welcome to EZRAVIDS! Explore personalized movie & series suggestions.</p>';
  openModal(sampleContent);
 });

 // TMDb API key (replace with your actual key)
 const API_KEY = '262790dcf12cf40b2e9b7125fcefd041';

 const form = document.getElementById('pref-form');
 const resultsSection = document.getElementById('results');

 // Form submission
 form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const genres = Array.from(document.getElementById('genres').selectedOptions).map(option => option.value);
  const minRating = parseFloat(document.getElementById('min-rating').value);
  const type = document.getElementById('type').value;
  
  const userPreferences = { genres, minRating, type };
  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  
  // Construct the URL with query parameters
  let url = `results.html?genres=${genres.map(encodeURIComponent).join(',')}&minRating=${encodeURIComponent(minRating)}&type=${encodeURIComponent(type)}`;
  
  // Redirect to the new page
  window.location.href = url;
 });

 // Get recommendations from TMDb - THIS FUNCTION IS NO LONGER USED IN THIS CODE
 async function getRecommendations(genres, minRating, type) {
  try {
   const genreString = genres.join(',');
   const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genreString}&vote_average.gte=${minRating}&sort_by=popularity.desc&page=1`;
   
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

 // Display recommendations - THIS FUNCTION IS NO LONGER USED IN THIS CODE
 function displayRecommendations(data) {
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

 // Modal structure
 function openModal(content) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '✖️';
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  closeBtn.addEventListener('click', () => {
   document.body.removeChild(modal);
  });
 }
