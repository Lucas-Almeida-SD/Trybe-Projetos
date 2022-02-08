const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste se productDetails é uma função.
    expect(typeof productDetails).toBe('function');
    // Teste se o retorno da função é um array.
    expect(Array.isArray(productDetails())).toBe(true);
    // Teste se o array retornado pela função contém dois itens dentro.
    expect(productDetails().length).toBe(2);
    // Teste se os dois itens dentro do array retornado pela função são objetos.

    for (let index = 0; index < productDetails().length; index += 1) {
      expect(typeof productDetails('string1', 'string2')[index].name).toBe('string');
    }
    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    const array = productDetails('str1', 'str2');
    expect(array[0]).not.toEqual(array[1]);
    // Teste se os dois productIds terminam com 123.
    for (let index = 0; index < productDetails().length; index += 1) {
      let productIds = productDetails('str1', 'str2')[index].details['productId'];
      productIds = productIds.slice(productIds.length - 3, productIds.length);
      expect(productIds).toBe('123');
    }
  });
});
