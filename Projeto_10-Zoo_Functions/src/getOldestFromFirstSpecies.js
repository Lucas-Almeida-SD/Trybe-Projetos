const data = require('../data/zoo_data');

function getOldestAnimal(animal) {
  const oldest = animal.residents.reduce((acc, element) =>
    ((element.age > acc.age) ? element : acc));
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const { species, employees } = data;
  const animalId = employees.find((element) => element.id === id).responsibleFor[0];
  const animal = species.find((element) => element.id === animalId);
  return getOldestAnimal(animal);
}

module.exports = getOldestFromFirstSpecies;
