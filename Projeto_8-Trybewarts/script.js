const btnLogin = document.querySelector('#btn-login');

function validarLogin() {
  const inputEmail = document.querySelector('#input-email-header').value;
  const inputPassword = document.querySelector('#input-password').value;
  if (inputEmail === 'tryber@teste.com' && inputPassword === '123456') {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Email ou senha inválidos.');
  }
}
btnLogin.addEventListener('click', validarLogin);

// Funcao para ativar/desativar o botão de submit  do Formulário de Avaliação
const checkboxCondicions = document.querySelector('#agreement');
const btnSubmit = document.querySelector('#submit-btn');
function ferificarCheckbox() {
  if (checkboxCondicions.checked === true) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}
checkboxCondicions.addEventListener('click', ferificarCheckbox);

// Função para contar o número de caracteres restantes do Textarea do Formulário
const textArea = document.querySelector('#textarea');
let textAreaValue;
function contadorDeCaracteres(event) {
  const subText = parseInt(textArea.maxLength, 10) - textArea.value.length;
  const counter = document.querySelector('#counter');
  counter.innerText = subText;
  textAreaValue = event.target.value;
  localStorage.setItem('textAreaValue', JSON.stringify(textAreaValue));
}
textArea.addEventListener('keyup', contadorDeCaracteres);

// Funcao para capturar o valor do Nome
const firstName = document.querySelector('#input-name');
let firstNameValue;
function getNameValue(event) {
  firstNameValue = event.target.value;
  localStorage.setItem('firstNameValue', JSON.stringify(firstNameValue));
}
firstName.addEventListener('change', getNameValue);

// Funcao para capturar o valor do Sobrenome
const lastName = document.querySelector('#input-lastname');
let lastNameValue;
function getLastNameValue(event) {
  lastNameValue = event.target.value;
  localStorage.setItem('lastNameValue', JSON.stringify(lastNameValue));
}
lastName.addEventListener('change', getLastNameValue);

// Funcao para capturar o valor do Email
const email = document.querySelector('#input-email');
let emailValue;
function getEmailValue(event) {
  emailValue = event.target.value;
  localStorage.setItem('emailValue', JSON.stringify(emailValue));
}
email.addEventListener('change', getEmailValue);

// Funcao para capturar os valores da Casa
const casa = document.querySelector('#house');
let houseValue = document.querySelector('#gitnoria-house').value;
function getHouseValue(event) {
  houseValue = event.target.value;
  localStorage.setItem('houseValue', JSON.stringify(houseValue));
}
casa.addEventListener('click', getHouseValue);

// Funcao para capturar os valores das Família
let familyValue;
const family = document.querySelector('#family-radio');
function getFamilyValue(event) {
  if (event.target.name === 'family') {
    familyValue = event.target.value;
    localStorage.setItem('familyValue', JSON.stringify(familyValue));
  }
}
family.addEventListener('click', getFamilyValue);

// Funcao para capturar os valores das Matérias
let subjectsValues = [];
const subject = document.querySelector('#section-subjects');

let subjectsValuesString;
function addSpaceBeetweenSubjects() {
  subjectsValuesString = '';
  for (let index = 0; index < subjectsValues.length; index += 1) {
    if (index !== subjectsValues.length - 1) {
      subjectsValuesString += `${subjectsValues[index]}, `;
    } else {
      subjectsValuesString += `${subjectsValues[index]}`;
    }
  }
  localStorage.setItem('subjectsValues', JSON.stringify(subjectsValuesString));
}

function getSubjectsValues(event) {
  const element = event.target;
  if (element.classList.contains('subject') === true && element.checked === true) {
    subjectsValues.push(event.target.value);
  } else if (element.classList.contains('subject') === true && element.checked === false) {
    subjectsValues.splice(subjectsValues.indexOf(event.target.value), 1);
  }
  subjectsValues = subjectsValues.sort();
  addSpaceBeetweenSubjects();
}
subject.addEventListener('click', getSubjectsValues);

// Funcao para capturar os valor do Textarea
let assessmentValue;
const assessment = document.querySelector('#section-assessment-trybewarts');
function getAssessmentValue(event) {
  if (event.target.name === 'rate') {
    assessmentValue = event.target.value;
    localStorage.setItem('assessmentValue', JSON.stringify(assessmentValue));
  }
}
assessment.addEventListener('click', getAssessmentValue);

// Verificar se na Section das matérias possui pelo menos um checked
const checkSubjects = () => {
  const subjectInputs = document.querySelectorAll('.subject');
  const checks = [];
  subjectInputs.forEach((element) => {checks.push(element.checked)});
  if (checks.includes(true)) {
    subjectInputs[0].required = false;
    return true;
  }
  subjectInputs[0].required = true;
  return false;
}

// Verificar se o formulário foi preenchido
function checkForm() {
  if(firstNameValue !== undefined 
    && lastNameValue !== undefined
    && emailValue !== undefined
    && familyValue !== undefined
    && checkSubjects() === true 
    && assessmentValue !== undefined 
    && textAreaValue !== undefined) {
    return true;
  }
  return false;
}

// Funcao para preencher o fomulário com as informações capturadas
let info;
function createInfoForms() {
  info = {
    Nome: `${firstNameValue} ${lastNameValue}`,
    Email: emailValue,
    Casa: houseValue,
    Família: familyValue,
    Matérias: subjectsValuesString,
    Avaliação: assessmentValue,
    Observações: textAreaValue,
  };
}

const form = document.querySelector('#evaluation-form');
function deleteForm() {
  for (;form.children.length > 0;) {
    form.children[0].remove();
  }
}

function createTextsToForm() {
  for (let index = 0; index < Object.keys(info).length; index += 1) {
    const paragraph = document.createElement('p');
    paragraph.className = 'result';
    paragraph.innerText = `${Object.keys(info)[index]}: ${Object.values(info)[index]}`;
    form.appendChild(paragraph);
  }
}

function replaceForms(event) {
  if(checkForm()) {
    createInfoForms();
    deleteForm();
    createTextsToForm();
  }
}
btnSubmit.addEventListener('click', replaceForms);
