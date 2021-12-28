function background() {
  const divBackground = document.querySelector('#background');
  for (let index = 0; index < 100; index += 1) {
    const column = document.createElement('div');
    column.className = 'background-column';
    column.backgroundColor = 'white';
    divBackground.appendChild(column);
  }
}

function columnSelected(column) {
  const element = column;
  let color = 'rgb(';
  for (let index = 0; index < 3; index += 1) {
    const varyColorTone = Math.floor(Math.random() * 256);
    color += varyColorTone;
    if (index < 2) {
      color += ',';
    } else {
      color += ')';
    }
  }
  element.style.backgroundColor = color;
}

function putColorOnColumnBackground() {
  const listOfColumns = document.getElementsByClassName('background-column');
  const lengthOfListColumns = listOfColumns.length;
  const randomNumber = Math.floor(Math.random() * lengthOfListColumns);
  const randomColumn = listOfColumns[randomNumber];
  columnSelected(randomColumn);
}

function colorOfTheBackground(event) {
  const colorselected = event.target.style.backgroundColor;
  const pixels = document.getElementsByClassName('pixel');

  function putColorOfTheBackgroundOnPixel(element) {
    const pixelSelected = element.target;
    pixelSelected.style.backgroundColor = colorselected;
  }
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', putColorOfTheBackgroundOnPixel);
  }
}

function getColorOfTheBackground() {
  const listOfColumns = document.querySelector('#background').children;
  for (let index = 0; index < listOfColumns.length; index += 1) {
    listOfColumns[index].addEventListener('click', colorOfTheBackground);
  }
}

function randomColor() {
  const listOfColor = ['red', 'green', 'blue', 'yellow',
    'pink', 'orange', 'purple', 'gray', 'brown', 'cyan', 'darkslategray'];
  const listOfColorToUse = [];
  for (; listOfColorToUse.length < listOfColor.length;) {
    const color = listOfColor[Math.floor(Math.random() * listOfColor.length)];
    if (listOfColorToUse.indexOf(color) === -1) {
      listOfColorToUse.push(color);
    }
  }
  return listOfColorToUse;
}

function paleteTop(list) {
  let pixelPalete = document.querySelector('#color-palette').firstElementChild;
  pixelPalete.id = 'black';
  pixelPalete.style.backgroundColor = 'black';
  pixelPalete.style.boxShadow = '0 0 30px black';
  pixelPalete = pixelPalete.nextElementSibling;
  for (pixelPalete; pixelPalete !== null; pixelPalete = pixelPalete.nextElementSibling) {
    const color = list[0];
    pixelPalete.style.backgroundColor = color;
    pixelPalete.id = color;
    pixelPalete.style.boxShadow = `0 0 30px ${color}`;
    list.shift();
  }
  return list;
}

function paleteLeftAndRight(list, palete) {
  let pixelPalete = document.querySelector(palete).firstElementChild;
  for (pixelPalete; pixelPalete !== null; pixelPalete = pixelPalete.nextElementSibling) {
    const color = list[0];
    pixelPalete.style.backgroundColor = color;
    pixelPalete.id = color;
    pixelPalete.style.boxShadow = `0 0 30px ${color}`;
    list.shift();
  }
  return list;
}

function putColorOnPalete() {
  const listOfColor = randomColor();
  const newList = paleteTop(listOfColor);
  const finalList = paleteLeftAndRight(newList, '#color-box-left');
  paleteLeftAndRight(finalList, '#color-box-right');
}

function cratePixels(line, numberOfPixels) {
  for (let index = 0; index < numberOfPixels; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
    line.appendChild(pixel);
  }
}

function createLine(numberOfLines) {
  const pixelBoard = document.querySelector('#pixel-board');
  const pixelsBox = document.querySelector('#pixels-box');
  pixelBoard.style.width = `${(numberOfLines * 40) + (numberOfLines * 2)}px`;
  pixelBoard.style.height = `${(numberOfLines * 40) + (numberOfLines * 2)}px`;
  pixelsBox.style.width = `${(numberOfLines * 40) + (numberOfLines * 2) + 140}px`;
  pixelsBox.style.height = `${(numberOfLines * 40) + (numberOfLines * 2) + 140}px`;

  for (let index = 0; index < numberOfLines; index += 1) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.width = `${(numberOfLines * 40) + (numberOfLines * 2)}px`;
    line.style.height = `${42}px`;
    cratePixels(line, numberOfLines);
    pixelBoard.appendChild(line);
  }
}

function getColor(eventGetColor) {
  const color = eventGetColor.target.id;
  document.querySelector('.selected').classList.remove('selected');
  eventGetColor.target.classList.add('selected');

  function putColor(event) {
    const pixel = event.target.style;
    pixel.backgroundColor = color;
  }
  const pixelBoard = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelBoard.length; index += 1) {
    pixelBoard[index].addEventListener('click', putColor);
  }
}

function selectAColor() {
  const palete = document.getElementsByClassName('colorAdd');
  for (let index = 0; index < palete.length; index += 1) {
    palete[index].addEventListener('click', getColor);
  }
}

function firstColor() {
  function putFirstColor(event) {
    const firstColorSelected = document.querySelector('.selected').id;
    const put = event.target.style;
    put.backgroundColor = firstColorSelected;
  }

  const pixelBoard = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelBoard.length; index += 1) {
    pixelBoard[index].addEventListener('click', putFirstColor);
  }
  return 0;
}

function clearBoard() {
  const pixelsBoard = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelsBoard.length; index += 1) {
    pixelsBoard[index].style.backgroundColor = 'white';
  }
}

function selectBoardToClear() {
  const clearButton = document.querySelector('#clear-board');
  clearButton.addEventListener('click', clearBoard);
}

function generatePixels(NumberOfPixels) {
  const oldPixelsBoard = document.querySelector('#pixel-board').children;
  console.log(oldPixelsBoard);
  const numberOfChilds = oldPixelsBoard.length;
  for (let index = 0; index < numberOfChilds; index += 1) {
    oldPixelsBoard[0].remove();
  }
  createLine(NumberOfPixels);
  putColorOnPalete();
  document.querySelector('.selected').classList.remove('selected');
  document.querySelector('#black').classList.add('selected');
  firstColor();
}

function numberMaxAndMin(value) {
  let newValue = parseInt(value, 10);
  if (newValue < 5) {
    newValue = 5;
  } else if (value > 50) {
    newValue = 50;
  }
  generatePixels(newValue);
}

function getInput() {
  const inputValue = document.getElementById('board-size').value;
  if (inputValue === '') {
    window.alert('Board inválido!"');
  } else {
    numberMaxAndMin(inputValue);
  }
}

function buttonToGeneratePixels() {
  const buttonOfPixels = document.querySelector('#generate-board');
  buttonOfPixels.addEventListener('click', getInput);
}

background();
setInterval(putColorOnColumnBackground, 100);
putColorOnPalete();
createLine(5);
window.onload = firstColor();
selectAColor();
getColorOfTheBackground();
selectBoardToClear();
buttonToGeneratePixels();
