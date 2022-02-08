const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  console.log(ids);
  if (ids.length === 0) { return []; }
  const idsArray = data.species.filter((element) => ids.includes(element.id));
  return idsArray;
}

module.exports = getSpeciesByIds;
