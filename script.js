// Updated quiz data
const quizData = [{
        question: "What does CSS stand for?",
        options: ["Counter Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Which of the following is a front-end programming language?",
        options: ["Java", "Python", "HTML", "PHP"],
        correctAnswer: "HTML"
    },
    {
        question: "What is the purpose of the HTML <canvas> element?",
        options: ["To embed videos", "To draw graphics and animations", "To create forms", "To style text"],
        correctAnswer: "To draw graphics and animations"
    },
    {
        question: "Which of the following is not a valid HTTP status code?",
        options: ["200 OK", "404 Not Found", "300 Redirection", "500 Server Error"],
        correctAnswer: "300 Redirection"
    },
    {
        question: "What is the role of JavaScript in web development?",
        options: ["Styling web pages", "Creating database schemas", "Adding interactivity to websites", "Managing server-side logic"],
        correctAnswer: "Adding interactivity to websites"
    },
    {
        question: "Which of the following is a version control system commonly used in web development?",
        options: ["FTP", "Git", "SQL", "JSON"],
        correctAnswer: "Git"
    },
    {
        question: "What is the purpose of the CSS property 'box-sizing: border-box'?",
        options: ["It adds a border to the box element", "It includes padding and border in the total width and height of an element", "It removes the border of the box element", "It changes the color of the box element"],
        correctAnswer: "It includes padding and border in the total width and height of an element"
    },
    {
        question: "What is the difference between 'GET' and 'POST' methods in HTTP?",
        options: ["GET is used for submitting forms, and POST is used for retrieving data", "GET is used for retrieving data, and POST is used for submitting forms", "Both GET and POST are used interchangeably", "GET is used for database operations, and POST is used for styling web pages"],
        correctAnswer: "GET is used for retrieving data, and POST is used for submitting forms"
    },
    {
        question: "Which of the following is a responsive design technique in web development?",
        options: ["Flash-based layouts", "Fixed-width layouts", "Fluid grid layouts", "Inline layouts"],
        correctAnswer: "Fluid grid layouts"
    },
    {
        question: "What is the purpose of the HTML <meta> tag with the 'viewport' attribute?",
        options: ["It sets the background color of the webpage", "It defines the character encoding of the document", "It controls the display and scaling of the webpage on different devices", "It adds a meta description to the webpage for SEO purposes"],
        correctAnswer: "It controls the display and scaling of the webpage on different devices"
    }
];
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-btn");
const resultsContainer = document.getElementById("results-container");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLimit = 10; // Change const to let for timeLimit

// Audio elements
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");

function loadQuestion() {
    resetTimer();

    const currentQuizData = quizData[currentQuestion];
    questionContainer.innerText = currentQuizData.question;

    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(option));
        optionsContainer.appendChild(button);
    });

    // Start the timer
    timer = setInterval(updateTimer, 1000);
}

function selectOption(selectedOption) {
    resetTimer();

    const currentQuizData = quizData[currentQuestion];

    if (selectedOption === currentQuizData.correctAnswer) {
        score++;
        playCorrectSound();
    } else {
        playIncorrectSound();
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);

    questionContainer.style.display = "none";
    optionsContainer.style.display = "none";
    submitButton.style.display = "none";

    resultsContainer.innerText = `Your Score: ${score} out of ${quizData.length}`;
    resultsContainer.style.display = "block";
}

function resetTimer() {
    clearInterval(timer);
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = "";
    timeLimit = 10; // Reset the time limit for each question
}

function updateTimer() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `Time Left: ${timeLimit} s`;

    if (timeLimit === 0) {
        resetTimer();
        selectOption(); // Move to the next question when time runs out
    } else {
        timeLimit--;
    }
}

function playCorrectSound() {
    correctSound.play();
}

function playIncorrectSound() {
    incorrectSound.play();
}

// Initial load
loadQuestion();

// Event listener for submit button
submitButton.addEventListener("click", showResults);