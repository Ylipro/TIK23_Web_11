// Lista tehtävän lauseista
const problems = [
    "Missä asut?",
    "Mitä haluat ostaa?",
    "Kuinka vanha olet?",
    "Mitä haluat tehdä?",
    "Kuka sinä olet?",
    "Pidätkö kissoista?",
    "Onko sinulla koira?",
    "Kuka teki tämän?",
    "Paljonko kello on?",
    "Milloin linja-auto tulee?",
    "Milloin on syntymäpäiväsi?",
    "Missä koulusi on?",
    "Miksi koirat haukkuvat?",
    "Mitä sinä luet?",
    "Miksi tykkäät kissoista?",
    "Kuka on presidentti?",
    "Mikä on nimesi?",
    "Missä minä olen?",
    "Haluatko lemmikin?",
    "Haluatko lisää ruokaa?"
];

var correctAnswer = ""; // Tyhjä muuttuja showQuestion-funktiota varten

function pickQuestion(problems) {
    const randomResult = Math.floor(Math.random() * 21); // Valitsee satunnaisen numeron 0-2 väliltä

    return problems[randomResult]; // Esittää numeroa vastaavan lauseen listalta
}

function showQuestion() {
    var question = pickQuestion(problems); // Hakee lauseen yllä olevalla funktiolla
    document.getElementById("showSentence").innerHTML = question; // Tuo lauseen näkyviin
    correctAnswer = question; // Tallentaa muuttujaan arvotun lauseen
}

// Lista lauseiden oikeista vastauksista
const solutions = [
    "Where do you live?",
    "What do you want to buy?",
    "How old are you?",
    "What do you want to do?",
    "Who are you?",
    "Do you like cats?",
    "Do you have a dog?",
    "Who did this?",
    "How much is the clock?",
    "When does the bus come?",
    "When is your birthday?",
    "Where is your school?",
    "Why do dogs bark?",
    "What are you reading?",
    "Why do you like cats?",
    "Who is the president?",
    "What is your name?",
    "Where am I?",
    "Do you want a pet?",
    "Do you want more food?"
];

let points = 0; // Muuttuja pisteitä varten

function checkAnswer() {
    var problem = correctAnswer; // Hakee arvotun lauseen ja tallentaa sen problem-muuttujaan
    var problemIndex = 0;

    for (var i = 0; i < problems.length; i++) { // Etsii vastauksen arvottuun lauseeseen
        if(problems[i] === problem)
        {
            problemIndex = i;
            break;
        }
    }

    var input = document.getElementById("input1").value; // Hakee käyttäjän syötteen
    if(input === solutions[problemIndex]) { // Vertaa syötettä vastaukseen. Jos nämä täsmäävät, lisätään piste muuttujaan ja näytetään käyttäjälle
        points++;
        document.querySelector('#points').innerHTML = points;
        if (points === 10) {
                alert("Sait 10 / 10 oikein. Voitit pelin!")
        }
    }
}

correctAnswer = 0;
var maxPoints = 10;

function clearInput() { // Tyhjentää vastaus-kentän
    var input1 = document.getElementById("input1");
    input1.value = "";
}


// Tallentaa oikeiden vastausten pisteet sessionStorageen
function savePoints() {
    sessionStorage.setItem("Englanti", points + "/" + maxPoints)
}