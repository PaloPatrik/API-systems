const showLocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('coordinates').innerHTML = `Leveysaste: ${latitude} <br> Pituusaste: ${longitude}`;
};

const showError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Käyttäjä hylkäsi sijainnin käytön.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Sijaintitietoja ei ole saatavilla.");
            break;
        case error.TIMEOUT:
            alert("Aika loppui ennen kuin sijaintia voitiin määrittää.");
            break;
        default:
            alert("Tuntematon virhe.");
            break;
    }
};

document.getElementById('getLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else {
        alert("Geolocation ei ole tuettu tässä selaimessa.");
    }
});
