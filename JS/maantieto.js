document.addEventListener("DOMContentLoaded", function() {


    var countriesAndCapitals = [
        { country: "Venäjä", capital: "Moskova" },
        { country: "Kanada", capital: "Ottawa" },
        { country: "Kiina", capital: "Peking" },
        { country: "Yhdysvallat", capital: "Washington" },
        { country: "Brasilia", capital: "Rio de Janeiro" },
        { country: "Australia", capital: "Canberra" },
        { country: "Intia", capital: "Delhi" },
        { country: "Argentiina", capital: "Buenos Aires" },
        { country: "Kazakstan", capital: "Astana" },
        { country: "Algeria", capital: "Alger" },
        { country: "Kongo", capital: "Brazzaville" },
        { country: "Grönlanti", capital: "Nuuk" },
        { country: "Saudi-Arabia", capital: "Riad" },
        { country: "Meksiko", capital: "Mexico City" },
        { country: "Indonesia", capital: "Jakarta" },
        { country: "Sudan", capital: "Khartum" },
        { country: "Libya", capital: "Tripoli" },
        { country: "Iran", capital: "Teheran" },
        { country: "Mongolia", capital: "Ulan Baltor" },
        { country: "Peru", capital: "Lima" },
    ];

    var countryNameElement = document.querySelector('.country-name');
    var capitalInput = document.querySelector('#capitalInput');
    var submitButton = document.querySelector('#submitButton');
    var guessesList = document.querySelector('.guesses-list');

    // Lataa pelin
    initGame();

    function initGame() {
        // Tyhjentää syöttökentät
        countryNameElement.textContent = '';
        capitalInput.value = '';
        
        // Syöttö napin kuuntelija
        submitButton.addEventListener('click', onSubmitButtonClick);
    }


    var nextEmptyListItemIndex = 0;

    function onSubmitButtonClick() {
        var guessedCountry = document.querySelector('#countryInput').value.trim();
        var guessedCapital = document.querySelector('#capitalInput').value.trim();
        var correctCapital = countriesAndCapitals.find(entry => entry.country.toLowerCase() === guessedCountry.toLowerCase())?.capital;
        
        var resultMessage = guessedCapital.toLowerCase() === correctCapital?.toLowerCase() ? 'Oikein!' : 'Väärin.';
    
        // Etsii seuraavan tyhjän rivin listalta
        var emptyListItem = guessesList.querySelector(`li:empty:nth-child(${nextEmptyListItemIndex + 1})`);
    
        if (emptyListItem) {
            emptyListItem.setAttribute('data-country', guessedCountry);
            emptyListItem.innerHTML = `${guessedCountry} - ${guessedCapital}: <span>${resultMessage}</span>`;
            
            // Päivittää seuraavan tyhjän rivin indeksin
            nextEmptyListItemIndex++;
        }
    
            
        // Tyhjentää syöttökentät
        countryNameElement.textContent = '';
        capitalInput.value = '';
        countryInput.value = '';
    }
})
