const data = require('../data/zoo_data');

function getAnimalsAndLocations(speciesId) {
  const { species } = data;
  let animals = species.filter((element) => speciesId.includes(element.id));
  const locations = animals.map((element) => element.location);
  animals = animals.map((element) => element.name);
  return { animals, locations };
}

function toName(object, employees) {
  const { name } = object;
  const employee = employees.find((element) =>
    element.firstName === name || element.lastName === name);
  const { id, responsibleFor: speciesId } = employee;
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const { animals, locations } = getAnimalsAndLocations(speciesId);
  return { id, fullName, species: animals, locations };
}

function toId(object, employees) {
  const { id } = object;
  const employee = employees.find((element) => element.id === id);
  const { responsibleFor: speciesId } = employee;
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const { animals, locations } = getAnimalsAndLocations(speciesId);
  return { id, fullName, species: animals, locations };
}

function allEmployees(allIds, employees) {
  const infoEmployees = allIds.map((element) => {
    const idSelected = { id: element };
    return toId(idSelected, employees);
  });
  return infoEmployees;
}

function getEmployeesCoverage(object) {
  // seu código aqui
  const { employees } = data;
  const allIds = employees.map((element) => element.id);
  const allNames = employees.map((element) => element.firstName);
  const allLastName = employees.map((element) => element.lastName);
  if (object === undefined) { return allEmployees(allIds, employees); }
  const key = Object.keys(object);
  const value = Object.values(object);
  if ([...allIds, ...allNames, ...allLastName].includes(value[0]) === false) {
    throw new Error('Informações inválidas');
  }
  if (key[0] === 'name') { return toName(object, employees); }
  if (key[0] === 'id') { return toId(object, employees); }
}

module.exports = getEmployeesCoverage;
