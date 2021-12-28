const inputText = document.querySelector('#text-input');
const imageInputButton = document.querySelector('#meme-insert');
const colorTextButton = document.querySelector('#text-color');
const colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'cyan', 'white'];
let indexColor = 0;
const memeImageContainer = document.querySelector('#meme-image-container');
const memeImage = document.querySelector('#meme-image');
const memeImageId = '#meme-image';
const textOnImage = document.querySelector('#meme-text');
const fireBorderButton = document.querySelector('#fire');
const waterBorderButton = document.querySelector('#water');
const earthBorderButton = document.querySelector('#earth');
const firstMeme = document.querySelector('#meme-1');
const secondMeme = document.querySelector('#meme-2');
const thirdMeme = document.querySelector('#meme-3');
const fourthMeme = document.querySelector('#meme-4');

function checkImageInContainer() {
  const imgInContainer = document.querySelector(memeImageId);
  if (imgInContainer !== null) {
    imgInContainer.src = '';
  }
}

function getImageFromInput() {
  function getValueImage() {
    checkImageInContainer();
    const reader = new FileReader();
    reader.readAsDataURL(imageInputButton.files[0]);
    reader.onload = () => {
      memeImage.src = reader.result;
    };
    // o conhecimento dos comandos no script da linha 26 a 30 foi adquirido através do vídeo no youtube do canal do SatellaSoft, acessado no link https://www.youtube.com/watch?v=ZbbwP3Yz2dg.
  }
  imageInputButton.addEventListener('change', getValueImage);
}

function putTextOnImage() {
  function getText() {
    const text = inputText.value;
    textOnImage.innerText = text;
  }
  inputText.addEventListener('keyup', getText);
}

function changeColorText() {
  function getColor() {
    if (indexColor === colors.length) {
      indexColor = 0;
    }
    if (indexColor === 4 || indexColor === 6 || indexColor === 7) {
      colorTextButton.style.background = 'gray';
    } else {
      colorTextButton.style.background = 'rgb(240, 240, 240)';
    }
    textOnImage.style.color = colors[indexColor];
    colorTextButton.style.color = colors[indexColor];
    indexColor += 1;
  }
  colorTextButton.addEventListener('click', getColor);
}

function fireBorder() {
  function putFireBorder() {
    memeImageContainer.style.border = '3px dashed red';
  }
  fireBorderButton.addEventListener('click', putFireBorder);
}

function waterBorder() {
  function putWaterBorder() {
    memeImageContainer.style.border = '5px double blue';
  }
  waterBorderButton.addEventListener('click', putWaterBorder);
}

function earthBorder() {
  function putEarthBorder() {
    memeImageContainer.style.border = '6px groove green';
  }
  earthBorderButton.addEventListener('click', putEarthBorder);
}

function putFirstMemeInContainer(memeOne) {
  imageInputButton.value = null;
  checkImageInContainer();
  memeImage.src = memeOne.target.src;
}

function putSecondMemeInContainer(memeTwo) {
  imageInputButton.value = null;
  checkImageInContainer();
  memeImage.src = memeTwo.target.src;
}

function putThirdMemeInContainer(memeThree) {
  imageInputButton.value = null;
  checkImageInContainer();
  memeImage.src = memeThree.target.src;
}

function putFourthMemeInContainer(memeFour) {
  imageInputButton.value = null;
  checkImageInContainer();
  memeImage.src = memeFour.target.src;
}

function getPreMeme() {
  firstMeme.addEventListener('click', putFirstMemeInContainer);
  secondMeme.addEventListener('click', putSecondMemeInContainer);
  thirdMeme.addEventListener('click', putThirdMemeInContainer);
  fourthMeme.addEventListener('click', putFourthMemeInContainer);
}

getImageFromInput();
putTextOnImage();
changeColorText();
fireBorder();
waterBorder();
earthBorder();
getPreMeme();
