const data = require('../data/zoo_data');

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  const checkIsManager = employees.some((element) => element.managers.includes(id));
  return checkIsManager;
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const { employees } = data;
  const employeesArray = employees.filter((element) => element.managers.includes(managerId));
  const namesArray = employeesArray.map((element) => `${element.firstName} ${element.lastName}`);
  return namesArray;
}

module.exports = { isManager, getRelatedEmployees };
