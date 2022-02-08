const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function noParameters() {
  const speciesObject = {};
  species.forEach((element) => { speciesObject[element.name] = element.residents.length; });
  return speciesObject;
}

function withParameters(animalParameter) {
  const animal = species.find((element) => element.name === animalParameter[0]);
  const { residents } = animal;
  if (animalParameter.length === 2) {
    const counter = residents.reduce((acc, element) => {
      const amountAnimals = (element.sex === animalParameter[1]) ? acc + 1 : acc;
      return amountAnimals;
    }, 0);
    return counter;
  }
  return residents.length;
}

function countAnimals(animal) {
  // seu código aqui
  if (animal === undefined) {
    return noParameters();
  }
  return withParameters(Object.values(animal));
}

module.exports = countAnimals;
