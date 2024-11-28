const getCatFact = () => {
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fact').textContent = `Kissafakta: ${data.fact}`;
        })
        .catch(error => {
            document.getElementById('fact').textContent = 'Virhe haettaessa kissafaktaa.';
            console.error(error);
        });
};

const getCatBreed = () => {
    fetch('https://catfact.ninja/breeds')
        .then(response => response.json())
        .then(data => {
            const breeds = data.data;
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)].breed;
            document.getElementById('breed').innerText = 'Satunnainen kissarotu: ' + randomBreed;
        })
        .catch(error => {
            document.getElementById('breed').textContent = 'Virhe haettaessa kissarotua.';
            console.error(error);
        });
};

document.getElementById('fakta').addEventListener('click', () => {
    getCatFact(); 
});

document.getElementById('rotu').addEventListener('click', () => {
    getCatBreed();
});
