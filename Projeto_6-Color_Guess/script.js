const main = document.querySelector('main');
const aside = document.querySelector('aside');
const colorList = document.querySelector('#color-list');
const rgbColorText = document.querySelector('#rgb-color');
const answer = document.querySelector('#answer');
let ballSelected;
const standardAnswer = 'Escolha uma cor';
const correctAnswer = 'Acertou!';
const wrongAnswer = 'Errou! Tente novamente!';
const resetButton = document.querySelector('#reset-game');
const score = document.querySelector('#score');
let count = 0;
const firstGame = document.querySelector('#first-game-title');

function randomColor() {
  let color = 'rgb(';
  for (let index = 0; index < 3; index += 1) {
    const value = Math.floor(Math.random() * 256);
    color += value;
    if (index < 2) {
      color += ', ';
    } else {
      color += ')';
    }
  }
  return color;
}

function putColorOnBalls(numberOfBalls) {
  let balls = colorList.firstElementChild;
  const listOfGeneratedColors = [];
  for (; listOfGeneratedColors.length < numberOfBalls;) {
    const randomColorGenerated = randomColor();
    if (listOfGeneratedColors.indexOf(randomColorGenerated) === -1) {
      balls.style.backgroundColor = randomColorGenerated;
      balls.style.border = '3px solid black';
      balls = balls.nextElementSibling;
      listOfGeneratedColors.push(randomColorGenerated);
    }
  }
}

function createBalls(numberOfColor) {
  for (let index = 0; index < numberOfColor; index += 1) {
    const createDivForColors = document.createElement('div');
    createDivForColors.className = 'ball';
    colorList.appendChild(createDivForColors);
  }
  putColorOnBalls(numberOfColor);
}

function colorGuessText() {
  let ballToGuess = colorList.children;
  const randomNumber = Math.floor(Math.random() * ballToGuess.length);
  ballToGuess = ballToGuess[randomNumber];
  ballSelected = ballToGuess;
  ballToGuess = ballToGuess.style.backgroundColor;
  ballToGuess = ballToGuess.slice(3);
  rgbColorText.innerText = ballToGuess;
}

function addPointsOnScoreBoard(answerResult) {
  if (answerResult === true) {
    count += 3;
  } else if (count > 0) {
    count -= 1;
  }
  score.innerText = count;
}

function putBorderOnBall(ball, color) {
  const element = ball;
  element.style.border = `7px solid ${color}`;
}

function checkBall(event) {
  const valueColorText = rgbColorText.innerText;
  if (answer.innerText === standardAnswer) {
    if (event.target.style.backgroundColor === `rgb${valueColorText}`) {
      answer.innerText = correctAnswer;
      putBorderOnBall(event.target, 'green');
      addPointsOnScoreBoard(true);
    } else {
      answer.innerText = wrongAnswer;
      putBorderOnBall(event.target, 'red');
      putBorderOnBall(ballSelected, 'green');
      addPointsOnScoreBoard(false);
    }
  }
}

function selectBall() {
  const balls = colorList.children;
  for (let index = 0; index < balls.length; index += 1) {
    balls[index].addEventListener('click', checkBall);
  }
}

function resetGame() {
  function reset() {
    putColorOnBalls(colorList.children.length);
    colorGuessText();
    answer.innerText = standardAnswer;
    selectBall();
  }
  resetButton.addEventListener('click', reset);
}

createBalls(6);
colorGuessText();
selectBall();
resetGame();

// Níveis

const levelButton = document.querySelector('#level-button');
const levelText = document.querySelector('#level');
let levelController = levelText.innerText;

function updateLevel(numOfBalls) {
  for (; colorList.children.length > 0;) {
    colorList.children[0].remove();
  }
  count = 0;
  score.innerText = count;
  answer.innerText = standardAnswer;
  createBalls(numOfBalls);
  colorGuessText();
  selectBall();
}

function levelHard() {
  updateLevel(12);
}

function levelNormal() {
  updateLevel(6);
}

function levelEasy() {
  updateLevel(3);
}

function selectLevel() {
  if (levelController === 'Normal') {
    levelController = 'Difícil';
    levelHard();
    levelText.innerText = levelController;
  } else if (levelController === 'Difícil') {
    levelController = 'Fácil';
    levelEasy();
    levelText.innerText = levelController;
  } else {
    levelController = 'Normal';
    levelNormal();
    levelText.innerText = levelController;
  }
}

function level() {
  function changeLevel() {
    selectLevel();
  }
  levelButton.addEventListener('click', changeLevel);
}

level();

// CHANGE GAME

function changeToFirstGame() {
  function startFirstGame() {
    document.querySelector('.selected-game').classList.remove('selected-game');
    document.querySelector('#first-game-title').className = 'selected-game';
    main.style.display = 'block';
    aside.style.display = 'none';
    levelController = 'Fácil';
    selectLevel();
  }
  firstGame.addEventListener('click', startFirstGame);
}

changeToFirstGame();
