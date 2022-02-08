const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) { return {}; }
  const { employees } = data;
  const employeeObject = employees.find((element) => {
    if (element.firstName === employeeName || element.lastName === employeeName) {
      return true;
    }
    return false;
  });
  return { ...employeeObject };
}
console.log(getEmployeeByName('Wishart'));
module.exports = getEmployeeByName;
