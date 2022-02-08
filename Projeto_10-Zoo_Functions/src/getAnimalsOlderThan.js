const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const { species } = data;
  const animalArray = species.find((element) => element.name === animal);
  return animalArray.residents.every((element) => element.age >= age);
}

module.exports = getAnimalsOlderThan;
