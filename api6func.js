const fetchQuote = async () => {
    try {
        const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
        const data = await response.json();

        console.log("API Response:", data); 

        if (data && data.quote) {
            return data.quote; 
        } else if (data && data.message) {
            return data.message; 
        } else {
            console.log("Quote field not found. Full response:", data);  
            return 'Ei vitsiä saatavilla tällä hetkellä.';
        }
    } catch (error) {
        console.log('Error fetching the quote:', error);  
        return 'Vitsin hakeminen epäonnistui. Yritä uudelleen.'; 
    }
};

const showQuote = async () => {
    const quoteElement = document.getElementById('quote');
    if (!quoteElement) {
        console.log("The 'quote' element was not found.");
        return;
    }

    quoteElement.textContent = 'Ladataan vitsiä...';

    const quote = await fetchQuote();
    console.log("Fetched Quote:", quote);  

    quoteElement.textContent = quote;  
};

document.addEventListener('DOMContentLoaded', () => {
    const quoteButton = document.getElementById('quoteButton');
    
    if (quoteButton) {
        quoteButton.addEventListener('click', showQuote);
    } else {
        console.log("The 'quoteButton' element was not found.");  
    }
});
