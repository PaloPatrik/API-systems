const searchAnime = async () => {
    const query = document.getElementById('animeSearch').value;
    const type = document.getElementById('type').value;
    const status = document.getElementById('status').value;
    const rating = document.getElementById('rating').value;
    const minScore = document.getElementById('minScore').value;
    const maxScore = document.getElementById('maxScore').value;

    if (query.length < 3) return;

    let url = `https://api.jikan.moe/v4/anime?q=${query}&limit=6`;
    if (type) url += `&type=${type}`;
    if (status) url += `&status=${status}`;
    if (rating) url += `&rating=${rating}`;
    if (minScore) url += `&min_score=${minScore}`;
    if (maxScore) url += `&max_score=${maxScore}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';

        data.data.forEach(anime => {
            const animeElement = document.createElement('div');
            animeElement.classList.add('anime');
            animeElement.innerHTML = `
                <h2>${anime.title} (${anime.title_japanese})</h2>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" onclick="showAnimeDetails(${anime.mal_id})">
            `;
            resultsDiv.appendChild(animeElement);
        });
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
};


const showAnimeDetails = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        const anime = data.data;

        let recommendedAnime = '';
        if (anime.recommendations) {
            recommendedAnime = '<h3>Ehdotuksia:</h3>';
            anime.recommendations.slice(0, 4).forEach(rec => {
                recommendedAnime += `
                    <div class="recommendation">
                        <h4>${rec.title}</h4>
                        <img src="${rec.image_url}" alt="${rec.title}" onclick="showAnimeDetails(${rec.mal_id})">
                    </div>
                `;
            });
        }

        const animeDetails = `
            <h1>${anime.title} (${anime.title_japanese})</h1>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
            <p><strong>Type:</strong> ${anime.type}</p>
            <p><strong>Episodes:</strong> ${anime.episodes}</p>
            <p><strong>Status:</strong> ${anime.status}</p>
            <p><strong>Air Dates:</strong> ${anime.aired.from} - ${anime.aired.to}</p>
            <p><strong>Rating:</strong> ${anime.rating}</p>
            <p><strong>Score:</strong> ${anime.score}</p>
            ${recommendedAnime}
        `;

        document.body.innerHTML = animeDetails;
    } catch (error) {
        console.error("Error fetching anime details:", error);
    }
};


const randomAnime = async () => {
    try {
    
        const response = await fetch('https://api.jikan.moe/v4/anime');
        const data = await response.json();
        console.log(data);
        if (data && data.data && data.data.length > 0) {

            const randomIndex = Math.floor(Math.random() * data.data.length);
            const randomAnime = data.data[randomIndex];

            showAnimeDetails(randomAnime.mal_id);
        } else {
            console.error("No anime data available.");
        }
    } catch (error) {
        console.error("Error fetching random anime:", error);
    }
};



const fetchAiringAnime = async () => {
    try {
        const response = await fetch('https://api.jikan.moe/v4/anime?status=airing&limit=8');
        const data = await response.json();
        const airingAnime = data.data;

        let airingAnimeHTML = '<h3>Nyt julkaisussa:</h3><div class="airing-anime-list">';

        airingAnime.forEach(anime => {
            airingAnimeHTML += `
                <div class="anime-item">
                    <a href="/anime/${anime.mal_id}">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                        <h4>${anime.title}</h4>
                        <p>(${anime.title_japanese})</p>
                    </a>
                </div>
            `;
        });

        airingAnimeHTML += '</div>';

        document.querySelector('#airing-anime-container').innerHTML = airingAnimeHTML;

    } catch (error) {
        console.error("Error fetching airing anime:", error);
        document.querySelector('#airing-anime-container').innerHTML = '<p>Failed to load airing anime.</p>';
    }
};

fetchAiringAnime();
