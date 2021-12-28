const text = document.querySelector('#carta-texto');
const cartaGerada = document.querySelector('#carta-gerada');
const criarCartaButton = document.querySelector('#criar-carta');
const cartaContador = document.querySelector('#carta-contador');
const cartaContadorTexto1 = document.querySelector('#carta-contador-texto-1');
const cartaContadorTexto2 = document.querySelector('#carta-contador-texto-2');
const content = document.querySelector('#content');
const furosDiv = document.querySelector('#furos-laretal');
const piscasNatalinos = document.querySelector('#piscas-natalinos');

function selectStyles() {
  const grupoEstilo = ['newspaper', 'magazine1', 'magazine2'];
  const tamanho = ['medium', 'big', 'reallybig'];
  const rotacao = ['rotateleft', 'rotateright'];
  const inclinacao = ['skewleft', 'skewright'];
  const styles = [];
  styles.push(grupoEstilo[Math.floor(Math.random() * grupoEstilo.length)]);
  styles.push(tamanho[Math.floor(Math.random() * tamanho.length)]);
  styles.push(rotacao[Math.floor(Math.random() * rotacao.length)]);
  styles.push(inclinacao[Math.floor(Math.random() * inclinacao.length)]);
  return styles;
}

function putStyleOnWord(getWord) {
  const listOfStyles = selectStyles();
  for (let index = 0; index < listOfStyles.length; index += 1) {
    getWord.classList.add(listOfStyles[index]);
  }
}

function checkClassListsResponse(previousClass, newClass) {
  let result;
  if (previousClass === newClass) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function checkClassLists(element) {
  const word = element;
  const previousClass = word.className.split(' ');
  let newClassEqualPrevious = true;
  for (; newClassEqualPrevious === true;) {
    word.className = '';
    putStyleOnWord(word);
    const newClass = word.className.split(' ');
    newClassEqualPrevious = checkClassListsResponse(previousClass, newClass);
  }
}

function enableChangeStylesOfTheWord() {
  const spanList = cartaGerada.children;
  function changeStyles(event) {
    const element = event.target;
    checkClassLists(element);
  }
  for (let index = 0; index < spanList.length; index += 1) {
    spanList[index].addEventListener('click', changeStyles);
  }
}

function createSpans(wordList) {
  for (let index = 0; index < wordList.length; index += 1) {
    if (wordList[index] !== '') {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.innerText = wordList[index];
      putStyleOnWord(span);
      cartaGerada.appendChild(span);
    }
  }
}

function checkLetterResponse(resultNullLetter, wordList) {
  if (resultNullLetter === false) {
    createSpans(wordList);
    enableChangeStylesOfTheWord();
  } else {
    cartaGerada.innerText = 'Por favor, digite o conteúdo da carta.';
  }
}

function checkLetter(wordList) {
  let nullLetter = true;
  for (let index = 0; index < wordList.length; index += 1) {
    if (wordList[index] !== '') {
      nullLetter = false;
    }
  }
  checkLetterResponse(nullLetter, wordList);
}

function wordCounter() {
  const numberOfWordsInLetter = cartaGerada.children.length;
  cartaContadorTexto1.innerText = 'A carta possui ';
  cartaContador.innerText = numberOfWordsInLetter;
  cartaContadorTexto2.innerText = ' palavras.';
}

function removePreviousFuros() {
  const previousFuros = furosDiv.children;
  for (; previousFuros.length > 0;) {
    previousFuros[0].remove();
  }
}

function addFurosLateral() {
  removePreviousFuros();
  const mainHeight = content.clientHeight;
  const numberOfFuros = Math.floor(mainHeight / 50) - 1;
  for (let index = 0; index < numberOfFuros; index += 1) {
    const newFuro = document.createElement('div');
    newFuro.className = 'furo';
    furosDiv.appendChild(newFuro);
  }
}

function createLetter() {
  function getValue() {
    cartaGerada.innerText = '';
    const textLetterValue = text.value;
    const splitedText = textLetterValue.split(' ');
    checkLetter(splitedText);
    wordCounter();
    addFurosLateral();
  }
  criarCartaButton.addEventListener('click', getValue);
}

function addPiscaPisca() {
  const areaTelaPisca = piscasNatalinos.clientWidth * piscasNatalinos.clientHeight;
  const areaPisca = 40 ** 2;
  const numberOfPiscas = Math.floor(areaTelaPisca / areaPisca);
  console.log(numberOfPiscas);
  for (let index = 0; index < numberOfPiscas; index += 1) {
    const pisca = document.createElement('div');
    pisca.className = 'pisca-pisca';
    piscasNatalinos.appendChild(pisca);
  }
}

let piscasOn;
let piscaList;
function turnOffPisca() {
  for (let index = 0; index < piscasOn.length; index += 1) {
    piscaList[piscasOn[index]].style.backgroundColor = 'white';
  }
}

function turnOnPisca() {
  piscaList = piscasNatalinos.children;
  const colors = ['red', 'green', 'yellow', 'blue'];
  piscasOn = [];
  for (let index = 0; index < 100; index += 1) {
    const randomNumber = Math.floor(Math.random() * piscaList.length);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (piscasOn.indexOf(randomNumber) === -1) {
      piscaList[randomNumber].style.backgroundColor = randomColor;
      piscasOn.push(randomNumber);
    }
  }
  setTimeout(turnOffPisca, 400);
}

createLetter();
addFurosLateral();
addPiscaPisca();
setInterval(turnOnPisca, 500);
