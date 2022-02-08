/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/
function checkIsNumberFunction(array) {
  if (array.length === 0) {
    return undefined;
  }
  for (const element of array) {
    if (typeof element !== 'number') {
      return undefined;
    }
  }
  return true;
}

function media(array) {
  let counter = 0;
  for (const element of array) {
    counter += element;
  }
  const resultFoat = counter / array.length;
  const resultInt = parseInt(resultFoat, 10);
  const dif = Math.abs(resultFoat) - Math.abs(resultInt);
  let result = (dif >= 0.5) ? Math.abs(resultInt) + 1 : Math.abs(resultInt);
  result = (resultInt < 0) ? result * (-1) : result;
  return result;
}

const average = (array) => {
  const checkIsNumber = checkIsNumberFunction(array);
  let result;
  if (checkIsNumber === undefined) {
    result = undefined;
  } else {
    result = media(array);
  }
  return result;
};

module.exports = average;
