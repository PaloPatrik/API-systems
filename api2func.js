const kopioiTeksti = () => {
    const tekstikenttä = document.getElementById('teksti');
    tekstikenttä.select();
    tekstikenttä.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(tekstikenttä.value)
        .then(() => {
            alert('Teksti kopioitu leikepöydälle!');
        })
        .catch(err => {
            alert('Virhe kopioinnissa: ' + err);
        });
};

const liitä = () => {
    const copyButton = document.getElementById('kopioi');
    copyButton.addEventListener('click', kopioiTeksti);
};

liitä();