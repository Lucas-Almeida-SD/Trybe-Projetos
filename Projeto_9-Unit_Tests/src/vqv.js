/* eslint-disable no-unused-vars */

/*
  Use template literals para escrever uma função que,
  recebe seu nome e sua idade e retorna o parágrafo descrito abaixo.
  Caso a função seja chamada sem nenhum parâmetro, o valor undefined deve ser retornado.

  Parâmetros:
    - Uma string;
    - Um número.
  Comportamento:
    vqv(Tunico, 30) // Retorna:
      'Oi, meu nome é Tunico!
      Tenho 30 anos,
      trabalho na Trybe e mando muito em programação!
      #VQV!'
*/

function generatePhrase(string, number) {
  const phrase = `Oi, meu nome é ${string}!
Tenho ${number} anos,
trabalho na Trybe e mando muito em programação!
#VQV!`;
  return phrase;
}

const vqv = (string, number) => {
  let result;
  if (string === undefined || number === undefined) {
    result = undefined;
  } else {
    result = generatePhrase(string, number);
  }
  return result;
};

module.exports = vqv;
