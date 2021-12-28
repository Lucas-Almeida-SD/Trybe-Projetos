const mainToSecondGame = document.querySelector('main');
const asideToSecondGame = document.querySelector('aside');
const scoreSecondGame = document.querySelector('#score-second-game');
const changeLevelSecondGameButton = document.querySelector('#level-button-second-game');
const textLevelSecondGame = document.querySelector('#level-second-game');
const colorListSecondGame = document.querySelector('#color-list-second-game');
const colorListToRepeat = document.querySelector('#color-list-to-repeat');
const resetSecondGameButton = document.querySelector('#reset-second-game');
const answerSecondGame = document.querySelector('#answer-second-game');
const confirmSequenceButton = document.querySelector('#confirm-sequence-button');
const textTime = document.querySelector('#time');
const correctAnswerSecondGame = 'Acertou!';
const wrongAnswerSecondGame = 'Errou! Tente novamente!';
const atentionAnswerSecondGame = 'Atenção, você terá que refazer a sequência de cores abaixo!';
const secondGame = document.querySelector('#second-game-title');
const levelFacilSecondGame = 'Fácil';
const levelNormalSecondGame = 'Normal';
const levelDificilSecondGame = 'Difícil';
let listOfGeneratedColorsCircles = [];
let shuffleList = [];
let listToCheckSequence = [];
let numCircles = 6;
let colorToChangeWhiteCircle;
let timeInterval;
let time;
let countSecondGame = 0;

function stopwatch() {
  textTime.innerText = `Tempo: ${time}`;
  time -= 1;
  if (time < 0) {
    clearInterval(timeInterval);
    textTime.innerText = null;
  }
}
function callTimeInterval() {
  timeInterval = setInterval(stopwatch, 1000);
}
function removePreviousCircles() {
  for (; colorListSecondGame.children.length > 0;) {
    colorListSecondGame.children[0].remove();
    colorListToRepeat.children[0].remove();
  }
  colorListToRepeat.style.border = null;
}

function createCircles(numberOfCircle, placeToPutCircles) {
  for (let index = 0; index < numberOfCircle; index += 1) {
    const createDivForColorsSecondGame = document.createElement('div');
    createDivForColorsSecondGame.className = 'circle';
    createDivForColorsSecondGame.style.border = '3px solid black';
    placeToPutCircles.appendChild(createDivForColorsSecondGame);
  }
}
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
function putColorOnCircles(numberOfCircles) {
  let circles = colorListSecondGame.firstElementChild;
  listOfGeneratedColorsCircles = [];
  for (; listOfGeneratedColorsCircles.length < numberOfCircles;) {
    const randomColorGeneratedSecondGame = randomColor();
    if (listOfGeneratedColorsCircles.indexOf(randomColorGeneratedSecondGame) === -1) {
      circles.style.backgroundColor = randomColorGeneratedSecondGame;
      circles = circles.nextElementSibling;
      listOfGeneratedColorsCircles.push(randomColorGeneratedSecondGame);
    }
  }
}
function colorSequence() {
  createCircles(numCircles, colorListSecondGame);
  putColorOnCircles(numCircles);
}
function putShuffleColorsOnCircles() {
  for (let index = 0; index < colorListSecondGame.children.length; index += 1) {
    colorListSecondGame.children[index].style.backgroundColor = shuffleList[index];
  }
}
function shuffleColorsToPutOnCircles() {
  shuffleList = [];
  for (; shuffleList.length < listOfGeneratedColorsCircles.length;) {
    const randomNumber = Math.floor(Math.random() * listOfGeneratedColorsCircles.length);
    const elementColor = listOfGeneratedColorsCircles[randomNumber];
    if (shuffleList.indexOf(elementColor) === -1) {
      shuffleList.push(elementColor);
    }
  }
  putShuffleColorsOnCircles();
}
function informationToPutColorOnWhiteCircle() {
  const textPartOne = 'A sequência foi desarrumada. ';
  const textPartTwo = 'Utilize suas cores para pintar os círculos brancos e tente ';
  const textPartThree = 'reproduzir a sequência exibida anteriormente.';
  answerSecondGame.innerText = textPartOne + textPartTwo + textPartThree;
}
function putColorOnWhiteCircle() {
  function changeColor(event) {
    const conditionOne = answerSecondGame.innerText !== correctAnswerSecondGame;
    const conditionTwo = answerSecondGame.innerText !== wrongAnswerSecondGame;
    if (conditionOne && conditionTwo) {
      const circle = event.target;
      circle.style.backgroundColor = colorToChangeWhiteCircle;
    }
  }
  for (let index = 0; index < colorListToRepeat.children.length; index += 1) {
    colorListToRepeat.children[index].addEventListener('click', changeColor);
  }
}
function startRepeatSequence() {
  createCircles(numCircles, colorListToRepeat);
  informationToPutColorOnWhiteCircle();
  colorListToRepeat.style.border = '1px solid black';
  function getColor(event) {
    colorToChangeWhiteCircle = event.target.style.backgroundColor;
    putColorOnWhiteCircle();
  }
  for (let index = 0; index < colorListSecondGame.children.length; index += 1) {
    colorListSecondGame.children[index].addEventListener('click', getColor);
  }
}
function updateScore(valueAnswer) {
  if (valueAnswer) {
    countSecondGame += 3;
  } else if (countSecondGame > 0) {
    countSecondGame -= 1;
  }
  scoreSecondGame.innerText = countSecondGame;
}
function showCorrectAnswer() {
  textTime.innerText = 'Sequência Correta:';
  for (let index = 0; index < listOfGeneratedColorsCircles.length; index += 1) {
    colorListSecondGame.children[index].style.backgroundColor = listOfGeneratedColorsCircles[index];
    if (listToCheckSequence[index] === listOfGeneratedColorsCircles[index]) {
      colorListToRepeat.children[index].style.border = '4px dashed green';
    } else {
      colorListToRepeat.children[index].style.border = '4px dashed red';
    }
  }
}
function sequenceAnswer(checkAnswer) {
  if (checkAnswer) {
    answerSecondGame.innerText = correctAnswerSecondGame;
  } else {
    answerSecondGame.innerText = wrongAnswerSecondGame;
  }
  confirmSequenceButton.style.display = 'none';
  showCorrectAnswer();
  updateScore(checkAnswer);
}
function checkSequence() {
  let verification = true;
  for (let index = 0; index < listToCheckSequence.length; index += 1) {
    if (listToCheckSequence[index] !== listOfGeneratedColorsCircles[index]) {
      verification = false;
      break;
    }
  }
  sequenceAnswer(verification);
}
function getColorOfWhiteCircles() {
  listToCheckSequence = [];
  for (let index = 0; index < colorListToRepeat.children.length; index += 1) {
    listToCheckSequence.push(colorListToRepeat.children[index].style.backgroundColor);
  }
  checkSequence();
}
function confirmSequence() {
  confirmSequenceButton.style.display = 'inline-block';
  confirmSequenceButton.innerText = 'Confirmar Sequência';
  confirmSequenceButton.addEventListener('click', getColorOfWhiteCircles);
}

function iniciarReiniciar() {
  function startGame() {
    confirmSequenceButton.style.display = 'none';
    if (answerSecondGame.innerText !== atentionAnswerSecondGame) {
      removePreviousCircles();
      answerSecondGame.innerText = atentionAnswerSecondGame;
      time = 10;
      textTime.innerText = `Tempo: ${time}`;
      setTimeout(callTimeInterval, 2000);
      colorSequence();
      setTimeout(shuffleColorsToPutOnCircles, 13000);
      setTimeout(startRepeatSequence, 13000);
      setTimeout(confirmSequence, 13000);
    }
  }
  resetSecondGameButton.addEventListener('click', startGame);
}
iniciarReiniciar();
// NÍVEIS
function upgateLevelSecondGame() {
  confirmSequenceButton.style.display = 'none';
  removePreviousCircles();
  answerSecondGame.innerText = 'Aperte em INICIAR/REINICIAR';
  textTime.innerText = null;
  countSecondGame = 0;
  scoreSecondGame.innerText = countSecondGame;
}
function checkLevel() {
  if (textLevelSecondGame.innerText === levelFacilSecondGame) {
    textLevelSecondGame.innerText = levelNormalSecondGame;
    numCircles = 6;
  } else if (textLevelSecondGame.innerText === levelNormalSecondGame) {
    textLevelSecondGame.innerText = levelDificilSecondGame;
    numCircles = 12;
  } else {
    textLevelSecondGame.innerText = levelFacilSecondGame;
    numCircles = 3;
  }
  upgateLevelSecondGame();
}
function changeLevelSecondGame() {
  function checkAnswerSecondGame() {
    if (answerSecondGame.innerText !== atentionAnswerSecondGame) {
      checkLevel();
    }
  }
  changeLevelSecondGameButton.addEventListener('click', checkAnswerSecondGame);
}
changeLevelSecondGame();

function changeToSecondGame() {
  function changeGame() {
    mainToSecondGame.style.display = 'none';
    asideToSecondGame.style.display = 'block';
    document.querySelector('.selected-game').classList.remove('selected-game');
    document.querySelector('#second-game-title').className = 'selected-game';
  }
  secondGame.addEventListener('click', changeGame);
}
changeToSecondGame();
