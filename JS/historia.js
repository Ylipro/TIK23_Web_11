
document.addEventListener('DOMContentLoaded', function() {
    var nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextQuestion);

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
        },
        {
            question: "Mikä oli keskiajan yleisin juoma?",
            options: ["Viini", "Olut", "Vesi", "Maito"],
            correctAnswer: "Olut"
        },
        {
            question: "Kuka oli kuuluisa englantilainen keskiajan kirjailija?",
            options: ["William Shakespeare", "Geoffrey Chaucer", "Jane Austen", "Charles Dickens"],
            correctAnswer: "Geoffrey Chaucer"
        }
    ];
    

var currentQuestionIndex = 0;

function displayQuestion() {
    var questionContainer = document.getElementById('question-container');
    var currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = '';

   
    var questionElement = document.createElement('p');
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

 
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
        var questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '<p>Kaikki kysymykset suoritettu!</p>';
        document.getElementById('result').textContent = '';

       
        var restartButton = document.createElement('button');
        restartButton.textContent = 'Aloita uusi peli';
        restartButton.onclick = function() {
            currentQuestionIndex = 0; 
            displayQuestion(); 
        };
        questionContainer.appendChild(restartButton);
    }
}




displayQuestion();
});