const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const roundDisplay = document.getElementById('round');
const highscoreDisplay = document.getElementById('highscore');
const messageDisplay = document.getElementById('message');

let sequence = [];
let playerSequence = [];
let round = 0;

// Highscore implementation with username
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let highscore = Math.max(...highScores.map(score => score.score), 0);
highscoreDisplay.textContent = highscore;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        playerSequence.push(button.id);
        flashButton(button);
        checkSequence();
    });
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    messageDisplay.textContent = '';
    playerSequence = [];
    sequence = [];
    round = 0;
    nextRound();
}

function nextRound() {
    round++;
    roundDisplay.textContent = round;
    playerSequence = [];
    sequence.push(getRandomColor());
    playSequence();
}

function getRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function flashButton(button) {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
        } else {
            flashButton(document.getElementById(sequence[i]));
            i++;
        }
    }, 600);
}

function checkSequence() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        messageDisplay.textContent = 'Juego Terminado';
        if (round > highscore) {
            highscore = round;
            const username = localStorage.getItem('inputData');
            saveHighScore(username, highscore);
            highscoreDisplay.textContent = highscore;
        }
    } else if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function resetGame() {
    messageDisplay.textContent = 'Juego Reiniciado';
    playerSequence = [];
    sequence = [];
    round = 0;
    roundDisplay.textContent = round;
}

// Save high score with username and update local storage
function saveHighScore(name, score) {
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

// Display high scores
function displayHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = highScores.map(scoreEntry => 
        `<li>${scoreEntry.name}: ${scoreEntry.score}</li>`
    ).join('');
}

// Initialize high scores on page load
document.addEventListener('DOMContentLoaded', displayHighScores);

// Sound effects
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById(`${this.id}-sound`).play();
    });
});
