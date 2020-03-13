/*

GAME FUNCTION:
- Player must guess a number between a given min and max
- Player gets a limited number of guesses
- Notify the player of guesses remaining
- If lose, notify player of the answer
- Give the player the option to play again

*/

//Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max);
    guessLeft = 3;

//UI elements
const game = document.querySelector('.game'), 
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'), 
      guessInput = document.querySelector('#guess-input'), 
      message = document.querySelector('.message');
      
      //console.log(winningNum);

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(event){
    if(event.target.className === 'play-again'){
        window.location.reload();
    }
});

//listen for guess
guessBtn.addEventListener("click", function(){
    console.log(guessInput.value);
    //cast entry from string to integer
    let guess = parseInt(guessInput.value);

    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }
    //check if won
    else if(guess === winningNum){
        //Game over -> WON!
        gameOver(true, `Well done! You guessed the number ${winningNum} correctly - you win!`);
    }else{
        //get one wrong, remove from guesses left
        guessLeft -= 1;

        if(guessLeft === 0){
            //game over - lost
            gameOver(false, `Game over; you used up all your guesses.  The correct number was ${winningNum}.`);
        }else{
            //Game continues, but answer is wrong
            guessInput.style.border = '1px solid red';
            if(guessLeft == 1){
                setMessage(`${guess} is incorrect.  You have ${guessLeft} guess left.`);
            }else{
                setMessage(`${guess} is incorrect.  You have ${guessLeft} guesses left.`);
            }
            //remove guess input value
            guessInput.value = "";
        }
    }
});

//random number generated between min and max
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min); 
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Game over
function gameOver(won, msg){
    //determine color 
    let color;
    won === true ? color = 'green' : color = 'red';
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.border = '1px solid ' + color;
    //set Message
    setMessage(msg, color);

    //play again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again';
}

/*   This was some of my original stuff     */

/*
guessBtn.addEventListener("click", runGame);

function runGame(){
    console.log('Submit was clicked!');
    console.log(guessInput.value);
    console.log(typeof(guessInput.value));
    console.log(winningNum);

    if(guessInput.value == winningNum){
        
        guessInput.style.border = '1px solid green';
        guessInput.style.background = '#84fa84';
        message.innerHTML = `Well done! You guessed the number ${winningNum} correctly!`;
        playAgain();
    }
    else{
        guessLeft -= 1;
        guessInput.style.border = '1px solid #de5246';
        if(guessLeft > 1){
            message.innerHTML = `Sorry, you guessed incorrectly! You have ${guessLeft} chances remaining.`;
        }else if(guessLeft == 1){
            message.innerHTML = `Sorry, you guessed incorrectly! You have ${guessLeft} chance remaining.`
        }else{
            message.innerHTML = `Sorry, you guessed incorrectly and have no more chances! The correct number was ${winningNum}.`;
            guessInput.style.background = '#de8286';
            playAgain();
        } 
    }
}

function playAgain(){
    guessBtn.value = 'play again';
    guessInput.disabled = true;

}

*/