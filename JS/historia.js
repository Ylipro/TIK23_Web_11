

document.addEventListener('DOMContentLoaded', function() {
    var nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextQuestion);

    // Muu koodi tähän, esimerkiksi kysymysten määrittely ja näyttäminen



var questions = [
    {
        question: "Kuka oli Suomen kuningas keskiajalla?",
        options: ["Kustaa Vaasa", "Eerik Pommerilainen", "Kaarle Suuri", "Maunu Eerikinpoika"],
        correctAnswer: "Eerik Pommerilainen"
    },
    {
        question: "Mikä oli yleisin ammatti keskiajalla?",
        options: ["Ritari", "Kauppias", "Maanviljelijä", "Kirkonmies"],
        correctAnswer: "Maanviljelijä"
    },
    {
        question: "Missä uskottiin keskiajalla järjestettävän ritariturnajaisia?",
        options: ["Kööpenhaminassa", "Lontoossa", "Pariisissa", "Nürnbergissä"],
        correctAnswer: "Pariisissa"
    }
];

var currentQuestionIndex = 0;

function displayQuestion() {
    var questionContainer = document.getElementById('question-container');
    var currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = ''; // Tyhjennä kysymysalue

    // Lisää kysymys
    var questionElement = document.createElement('p');
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    // Lisää vastausvaihtoehdot
    currentQuestion.options.forEach(function(option) {
        var optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.onclick = function() {
            checkAnswer(option);
        };
        questionContainer.appendChild(optionElement);
    });
}

function checkAnswer(userAnswer) {
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;
    var resultElement = document.getElementById('result');

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Oikein!';
    } else {
        resultElement.textContent = 'Väärin, oikea vastaus oli: ' + correctAnswer;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        document.getElementById('result').textContent = '';
    } else {
        // Kaikki kysymykset käyty läpi
        var questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '<p>Kaikki kysymykset suoritettu!</p>';
        document.getElementById('result').textContent = '';
    }
}

// Alusta ensimmäinen kysymys
displayQuestion();
});