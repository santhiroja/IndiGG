// Define your questions with options and correct answers
const questions = [
    {
        question: "Question 1: What is the meaning of intimacy?",
        answers: ["Physical Closeness", "Emotional Connection", "Personal Space", "Intellectual rapport"],
        correct: 0, // The correct answer's index
    },
    {
        question: "Question 2: Which programming language is commonly used for data analysis and scientific computing?",
        answers: ["JavaScript", "Python", "Ruby", "Java"],
        correct: 1, // The correct answer's index
    },
    {
        question: "Question 3: What is the capital of Japan?",
        answers: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
        correct: 0, // The correct answer's index
    },
    {
        question: "Question 4: Who is the youngest actor to win an Oscar for Best Actor?",
        answers: ["Leonardo DiCaprio", "Eddie Redmayne", "Casey Affleck", "Adrien Brody"],
        correct: 3, // The correct answer's index
    },
    {
        question: "Question 5: Which planet is known as the Red Planet?",
        answers: ["Earth", "Venus", "Mars", "Jupiter"],
        correct: 2, // The correct answer's index
    }
];

// Initialize variables for the quiz
let currentQuestion = 0; // Current question index
let score = 0; // User's score
let timer; // Timer variable

// Get references to HTML elements
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer");
const feedbackText = document.getElementById("feedback");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const timerDisplay = document.getElementById("timer");

// Function to start a countdown timer
function startTimer(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function () {
        timerDisplay.textContent = `Time Left: ${timeLeft} s`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            checkAnswer(-1); // Timeout
            submitButton.disabled = true; // Disable the submit button
        }
    }, 1000);
}

// Function to load and display the current question
function loadQuestion() {
    submitButton.disabled = false; // Enable the submit button
    clearInterval(timer); // Clear any previous timers
    const question = questions[currentQuestion];
    questionText.textContent = question.question; // Display the current question
    feedbackText.textContent = ""; // Clear the feedback text

    for (let i = 0; i < answerButtons.length; i++) {
        // Populate answer buttons with answer options
        answerButtons[i].textContent = question.answers[i];
        // Remove any styling classes from previous questions
        answerButtons[i].classList.remove("correct");
        answerButtons[i].classList.remove("incorrect");
        answerButtons[i].classList.remove("selected");
    }
    startTimer(15); // Set timer for 15 seconds per question (adjust as needed)
}

// Add click event listeners to answer buttons to select answers
answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Remove the "selected" class from all answer buttons
        answerButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        // Add the "selected" class to the clicked answer button
        button.classList.add("selected");
    });
});

// Function to handle answer submission
function submit() {
    const selectedAnswer = document.querySelector(".answer.selected");

    if (!selectedAnswer) {
        feedbackText.textContent = "Please select an answer.";
        return;
    }

    const selectedAnswerIndex = Array.from(answerButtons).indexOf(selectedAnswer);
    checkAnswer(selectedAnswerIndex);
}

// Function to check the selected answer
function checkAnswer(selectedAnswer) {
    clearInterval(timer); // Clear the timer
    const question = questions[currentQuestion];

    if (selectedAnswer === question.correct) {
        // If the selected answer is correct
        score++; // Increment the score
        feedbackText.textContent = "Correct!"; // Display correct feedback
        answerButtons[selectedAnswer].classList.add("correct"); // Apply correct styling
    } else if (selectedAnswer === -1) {
        feedbackText.textContent = "Time's up!"; // Display timeout feedback
    } else {
        feedbackText.textContent = "Incorrect!"; // Display incorrect feedback
        answerButtons[selectedAnswer].classList.add("incorrect"); // Apply incorrect styling
        answerButtons[question.correct].classList.add("correct"); // Highlight correct answer
    }

    disableAnswerButtons(); // Disable answer buttons
    nextButton.disabled = false; // Enable the "Next" button
}

// Function to disable answer buttons
function disableAnswerButtons() {
    answerButtons.forEach((button) => {
        button.disabled = true;
    });
}

// Function to enable answer buttons
function enableAnswerButtons() {
    answerButtons.forEach((button) => {
        button.disabled = false;
    });
}

// Function to move to the next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++; // Move to the next question
        enableAnswerButtons(); // Enable answer buttons
        loadQuestion(); // Load the next question
        nextButton.disabled = true; // Disable the "Next" button until an answer is submitted
    } else {
        showResult(); // Show the quiz result when all questions are answered
    }
}

// Function to display the quiz result
function showResult() {
    questionText.textContent = "Quiz Completed!";
    feedbackText.textContent = "";
    answerButtons.forEach((button) => {
        button.style.display = "none"; // Hide answer buttons
    });
    timerDisplay.style.display = "none"; // Hide the timer display
    nextButton.style.display = "none"; // Hide the "Next" button
    submitButton.style.display = "none"; // Hide the "Submit" button
    scoreText.style.display = "block"; // Show the score
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
    restartButton.style.display = "block"; // Show the "Restart" button
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0; // Reset current question to the first question
    score = 0; // Reset the score

    // Reset the display of elements
    questionText.textContent = ""; // Clear the question text
    feedbackText.textContent = ""; // Clear the feedback text

    // Show all answer buttons and enable them
    answerButtons.forEach((button) => {
        button.style.display = "block";
        button.disabled = false;
    });

    // Show and enable the submit button
    submitButton.style.display = "inline";
    submitButton.disabled = false;

    // Reset the timer display
    timerDisplay.style.display = "block";

    // Hide the score, next, and restart buttons
    scoreText.style.display = "none";
    nextButton.disabled = false;
    nextButton.style.display = "inline";
    restartButton.style.display = "none";

    loadQuestion(); // Load the first question to restart the quiz
}

// Add a click event listener to the "Restart" button
restartButton.addEventListener("click", restartQuiz);

loadQuestion(); // Load the first question to start the quiz
