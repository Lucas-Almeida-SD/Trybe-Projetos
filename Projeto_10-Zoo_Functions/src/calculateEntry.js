const { prices } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countEntrants(entrants) {
  // seu código aqui
  const child = entrants.filter((element) => element.age < 18).length;
  const adult = entrants.filter((element) => element.age >= 18 && element.age < 50).length;
  const senior = entrants.filter((element) => element.age >= 50).length;
  return { child, adult, senior };
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) { return 0; }
  const objectPeople = Object.values(countEntrants(entrants));
  const { child, adult, senior } = prices;
  const pricesZoo = [child, adult, senior];
  const price = objectPeople.reduce((acc, element, index) => acc + (element * pricesZoo[index]), 0);
  return price;
}

module.exports = { calculateEntry, countEntrants };
