let sequence = [];
let clickedSequence = [];
let score = 0;

/*
   0 = green
   1 = red
   2 = yellow
   3 = blue
*/

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Shuffle color blink sequence
let shuffleSequence = () => {
  let newColor = Math.floor(Math.random() * 4);
  sequence[sequence.length] = newColor;
  clickedSequence = [];

  for(let i in sequence) {
    let elementColor = createColorElement(sequence[i]);
    blinkColor(elementColor, Number(i) + 1);
  }
}

// Blink the colored lights
let blinkColor = (elementColor, number) => {
  number = number * 500;
  setTimeout(() => {
    elementColor.classList.add('selected');
  }, number - 250);
  setTimeout(() => {
    elementColor.classList.remove('selected');
  }, number + 300);
}

// Check if the sequence clicked matches the game sequence
let checkSequence = () => {
  for (let i in clickedSequence) {
    if(clickedSequence[i] != sequence[i]) {
      gameOver();
      break;
    }
  }

  if(clickedSequence.length == sequence.length) {
    alert(`Score: ${score}\nYou win! Starting next level!`);
    nextLevel();
  }
}

// User click function
let click = (color) => {
  clickedSequence[clickedSequence.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkSequence();
  }, 250);
}

// Create the light blinks
let createColorElement = (color) => {
  if(color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
}

// Increase game level function
let nextLevel = () => {
  score++;
  shuffleSequence();
}

// Game over function
let gameOver = () => {
  alert(`Score: ${score}\nGAME OVER\nClick OK to start a new game.`);
  sequence = [];
  clickedSequence = [];

  startGame();
}

// Start game function
let startGame = () => {
  alert('Welcome! Match the color sequence given to score.')
  score = 0;

  nextLevel();
}

// Click functions
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

startGame();