const questions = [
    {
        question: "Mikä on kasvin tärkein energianlähde?",
        options: ["Aurinko", "Hyönteiset", "Linnut", "Puut"],
        answer: "Aurinko"
    },
    {
        question: "Mikä seuraavista on petokala?",
        options: ["Ahven", "Lohi", "Hauki", "Särki"],
        answer: "Hauki"
    },
    {
        question: "Ihmisen suurin sisäelin on?",
        options: ["Munuaiset", "Keuhkot", "Perna", "Kieli"],
        answer: "Keuhkot"
    },
    {
        question: "Montako luuta ihmisellä on?",
        options: ["270", "250", "200", "230"],
        answer: "200"
    },
    {
        question: "Mihin ryhmään ihminen kuuluu?",
        options: ["Nisäkkäisiin", "Tasalämpöisiin", "Selkärankaisiin", "Kaikkiin näihin"],
        answer: "Kaikkiin näihin"
    },
    {
        question: "Miksi luut paranevat?",
        options: ["Ne ovat elävää kudosta joissa on suonia", "Luut eivät parane", "Ne liitetään lääkärissä yhteen", "Luut sulatetaan"],
        answer: "Ne ovat elävää kudosta joissa on suonia"
    },
    {
        question: "Missä ihmisellä on nikama?",
        options: ["Kyynärpäässä", "Olkapäässä", "Rinnassa", "Selässä"],
        answer: "Selässä"
    },
    {
        question: "Mikä seuraavista ei ole myrkyllinen sieni?",
        options: ["Valkokärpässieni", "Pulkkosieni", "Harmaamustesieni", "Keltavahvero"],
        answer: "Keltavahvero"
    },
    {
        question: "Havupuiden lehdet ovat",
        options: ["Naavaa", "Neulasia", "Käpyjä", "Lehtiä"],
        answer: "Neulasia"
    },
    {
        question: "Mikä seuraavista eläimistä on suurikokoisin?",
        options: ["Hirvi", "Karhu", "Kettu", "Susi"],
        answer: "Hirvi"
    },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress');
const restartButton = document.getElementById('restartBtn');
const homeButton = document.getElementById('homeBtn');

restartButton.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    currentQuestion = 0;
    score = 0;
    resultElement.textContent = '';
    scoreElement.textContent = '';
    progressBar.style.display = 'block';
    restartButton.style.display = 'none';
    homeButton.style.display = 'none';
    loadQuestion();
}

homeButton.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/index.html";
});

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    const shuffledOptions = shuffleArray(question.options);
    shuffledOptions.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', () => checkAnswer(option, optionButton));
        optionsElement.appendChild(optionButton);
    });
    updateProgressBar();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer(selectedOption, optionButton) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
        resultElement.textContent = "Oikea vastaus!";
        optionButton.classList.add('correct');
        score++;
    } else {
        resultElement.textContent = "Väärä vastaus.";
        optionButton.classList.add('incorrect');
    }
    disableOptions();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(() => {
            loadQuestion();
        }, 1000);
    } else {
        setTimeout(() => {
            showScore();
        }, 1000);
    }
}

function disableOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

function showScore() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    scoreElement.textContent = "Peli päättyi. Sait " + score + " / " + questions.length + " oikeaa vastausta.";
    progressBar.style.display = 'none';
    restartButton.style.display = 'block';
    homeButton.style.display = 'block';
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.innerHTML = `<div style="width: ${progressPercentage}%;"></div>`;
}

loadQuestion();