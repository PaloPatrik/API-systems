const fetchDogImage = (breed = 'random') => {
    const url = breed === 'random' 
      ? 'https://dog.ceo/api/breeds/image/random' 
      : `https://dog.ceo/api/breed/${breed}/images/random`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        const imgElement = document.getElementById('dog-image');
        imgElement.src = imageUrl;
        imgElement.style.display = 'block'; 
      })
      .catch(error => {
        console.error('Virhe kuvan lataamisessa:', error);
      });
  };
  
  document.getElementById('get-dog-image').addEventListener('click', () => {
    const selectedBreed = document.getElementById('dog-breed').value;
    fetchDogImage(selectedBreed);
  });
  