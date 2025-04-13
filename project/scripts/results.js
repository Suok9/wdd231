document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    const resultsContainer = document.getElementById('searchResults');
    const API_KEY = '262790dcf12cf40b2e9b7125fcefd041'; // Make sure this is your actual API key

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const genresParam = getQueryParam('genres');
    const minRatingParam = getQueryParam('minRating');
    const typeParam = getQueryParam('type');

    if (genresParam && minRatingParam && typeParam) {
        const genres = genresParam.split(',');
        const minRating = parseFloat(minRatingParam);
        const type = typeParam;
        fetchRecommendations(genres, minRating, type);
    } else {
        resultsContainer.textContent = 'No search criteria provided.';
    }

    async function fetchRecommendations(genres, minRating, type) {
        try {
            const genreString = genres.join(',');
            const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genreString}&vote_average.gte=${minRating}&sort_by=popularity.desc&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                displayResults(data.results);
            } else {
                resultsContainer.textContent = 'No results found for the selected criteria.';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsContainer.textContent = 'An error occurred while fetching data.';
        }
    }

    function displayResults(data) {
        resultsContainer.innerHTML = '';
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('recommendation-item');
            itemDiv.dataset.itemId = item.id;
            itemDiv.style.cursor = 'pointer';
            itemDiv.addEventListener('click', () => openModal(item.id, typeParam));
            const title = document.createElement('h3');
            title.textContent = item.title || item.name;
            const posterImg = document.createElement('img');
            posterImg.src = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : 'placeholder.jpg';
            posterImg.alt = `${item.title || item.name} Poster`;
            itemDiv.appendChild(posterImg);
            itemDiv.appendChild(title);
            resultsContainer.appendChild(itemDiv);
        });
    }

    async function fetchMovieDetails(itemId, type) {
        const detailType = type === 'movie' ? 'movie' : 'tv';
        const url = `https://api.themoviedb.org/3/${detailType}/${itemId}?api_key=${API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching details:', error);
            return null;
        }
    }

    function openModal(itemId, type) {
        fetchMovieDetails(itemId, type)
            .then(details => {
                if (details) {
                    const modal = document.getElementById('itemModal');
                    const modalContent = document.getElementById('modalContent');
                    modalContent.innerHTML = `
                        <h3>${details.title || details.name}</h3>
                        ${details.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="${details.title || details.name} Poster">` : '<p>No poster available.</p>'}
                        <p><strong>Overview:</strong> ${details.overview || 'No description available.'}</p>
                        <p><strong>Rating:</strong> ${details.vote_average}/10</p>
                        <p><strong>Release Date:</strong> ${details.release_date || details.first_air_date || 'N/A'}</p>
                        ${details.runtime ? `<p><strong>Runtime:</strong> ${details.runtime} minutes</p>` : ''}
                        ${details.number_of_seasons ? `<p><strong>Seasons:</strong> ${details.number_of_seasons}</p>` : ''}
                        ${details.number_of_episodes ? `<p><strong>Episodes:</strong> ${details.number_of_episodes}</p>` : ''}
                        ${details.genres ? `<p><strong>Genres:</strong> ${details.genres.map(genre => genre.name).join(', ')}</p>` : ''}
                        ${details.homepage ? `<p><strong>Homepage:</strong> <a href="${details.homepage}" target="_blank">${details.homepage}</a></p>` : ''}
                    `;
                    modal.style.display = 'block';
                }
            });
    }

    function closeModal() {
        const modal = document.getElementById('itemModal');
        modal.style.display = 'none';
    }

    if (!document.getElementById('itemModal')) {
        const modal = document.createElement('div');
        modal.id = 'itemModal';
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <div id="modalContent">
                    </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        const style = document.createElement('style');
        style.textContent = `
            .modal {
            font-family: "Georgia", serif;
                display: none;
                font-weight: bolder;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.4);
            }

            .modal-content {
                background-color: beige;
                margin: 15% auto; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                border-radius: 5px;
                font-weight: bolder;
                position: relative;
            }

            .close-button {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }

            .close-button:hover,
            .close-button:focus {
                color: black;
                text-decoration: none;
            }

            #modalContent img {
                max-width: 100%;
                height: auto;
                margin-bottom: 10px;
            }

            #modalContent h3 {
                margin-top: 0;
            }
        `;
        document.head.appendChild(style);
    } else {
        const modal = document.getElementById('itemModal');
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }
});
