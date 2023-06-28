'use strict';

// DEFAULT VALUES
let smallest = 1;
let largest = 20;
let posAnswers = "Possible: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20";
let lives = 5;
let score = 0;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

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
const modifyLives = function (hearts) { 
    lives = hearts;
    document.querySelector('.lives').textContent = lives;
};
const possibleAnswer = function (g, highorlow) {
    posAnswers = "";

    if (highorlow === 'high')
    {
        // if guess is smaller than the largest but is still too high
        if (g < largest) {
            largest = g;
        }
    }
    else if (highorlow === 'low')
    {
        // if guess is too low
        if (g > smallest) {
            smallest = g + 1;
        }
    }

    for (let i = smallest; i <= largest; i++)
    {
        posAnswers += i + ', ';
    }
        posAnswers = posAnswers.slice(0, -2);
        document.querySelector('.label-posNums').textContent = 'Possible: ' + posAnswers;
}
const delay = ms => new Promise(res => setTimeout(res, ms));
const reset = async (hearts, endScore) =>  { 
    await delay(3000);
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    smallest = 1;
    largest = 20;
    document.querySelector('.label-posNums').textContent = "Possible: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20";
    modifyLives(hearts);
    setScore(endScore);
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
};
const setScore = function (score) {
    document.querySelector('.score').textContent = score;
};
const wrongIndicator = async () => {
    document.querySelector('.message').style.color = 'red';
    await delay(125);
    document.querySelector('.message').style.color = '#eee';
    await delay(125);
    document.querySelector('.message').style.color = 'red';
    await delay(125);
    document.querySelector('.message').style.color = '#eee';
    await delay(125);
    document.querySelector('.message').style.color = 'red';
    await delay(125);
    document.querySelector('.message').style.color = '#eee';
}

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
                wrongIndicator();
                possibleAnswer(guess, "high");
                lives--;
                modifyLives(lives);
            }
            // When guess is too low
            else if (guess < secretNumber)
            {
                displayMessage('⬇️ Too Low!');
                wrongIndicator();
                possibleAnswer(guess, "low")
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