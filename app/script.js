const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');

searchButton.addEventListener('click', searchMovies);

async function searchMovies() {
    const query = searchInput.value;
    if (!query) return;

    const apiKey = '36d1b7e9b248138487ef3d9b64e8d6ce';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        movieList.innerHTML = '';

        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.release_date}</p>
                <p>${movie.overview}</p>
            `;
            movieList.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
