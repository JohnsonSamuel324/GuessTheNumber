'use strict';

/*
console.log(document.querySelector('.message').textContent)
document.querySelector('.message').textContent = '🥳 Correct Number!'
console.log(document.querySelector('.message').textContent)

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
let lives = 5;
let score = 0;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secretNumber;

const displayMessage = function (message) {document.querySelector('.message').textContent = message};
const displayNumber = function(color) {
    document.querySelector('body').style.backgroundColor = color;
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';
};

const endGame = function () 
{ 
    document.querySelector('.lives').textContent = 0;
    displayMessage('😥 You lost!');
    displayNumber('#f03e3e');
    document.querySelector('.score').textContent = score;
    // Checks if game score is higher than highscore
    if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }
};
const modifyLives = function (lives) { 
    document.querySelector('.lives').textContent = lives;
};
const delay = ms => new Promise(res => setTimeout(res, ms));
const reset = async (lives, score) =>  { 
    await delay(3000);
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    modifyLives(lives);
    setScore(score);
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
};
const setScore = function (score) {
    document.querySelector('.score').textContent = score;
};



document.querySelector('.again').addEventListener('click', function() {
    // Resets game with (lives, score)
    reset(5, 0);
});

// Allows user to press enter key to check guess
let input = document.querySelector('input');
document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        document.querySelector('.check').click();
    }
});

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // When guess is empty or not valid
    if (!guess || guess < 0 || guess > 20) {
        displayMessage('⛔ Guess not valid!');
    }
    // When guess is correct
    else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        displayNumber('#60b347');
        lives++;
        modifyLives(lives);
        score += 10;
        setScore(score);
        reset(lives, score);
    }
    else if (guess != secretNumber)
    {
        if (lives > 1) {
            // When guess is too high
            if (guess > secretNumber)
            {
                displayMessage('⬆️ Too High!');
                lives--;
                modifyLives(lives);
            }
            // When guess is too low
            else if (guess < secretNumber)
            {
                displayMessage('⬇️ Too Low!');
                lives--;
                modifyLives(lives);
            }
        }
        // When player loses game
        else {
            endGame();
            // Resets game with (lives, score)
            reset(5, 0);
        }
    }
})