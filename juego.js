const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const roundDisplay = document.getElementById('round');
const highscoreDisplay = document.getElementById('highscore');
const messageDisplay = document.getElementById('message');

let sequence = [];
let playerSequence = [];
let round = 0;
/* let nombre = localStorage.getItem('Nombre') */
let highscore = localStorage.getItem('highscore') || 0;
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
            localStorage.setItem('highscore', highscore);
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
