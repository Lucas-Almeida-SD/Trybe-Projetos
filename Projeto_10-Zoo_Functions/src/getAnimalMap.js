const data = require('../data/zoo_data');

const { species } = data;

function onlyNameOfAnimals() {
  let NE = species.filter((element) => element.location === 'NE');
  let NW = species.filter((element) => element.location === 'NW');
  let SE = species.filter((element) => element.location === 'SE');
  let SW = species.filter((element) => element.location === 'SW');
  NE = NE.map((element) => element.name);
  NW = NW.map((element) => element.name);
  SE = SE.map((element) => element.name);
  SW = SW.map((element) => element.name);
  return { NE, NW, SE, SW };
}

function onlyLocationOfAnimals() {
  const NE = species.filter((element) => element.location === 'NE');
  const NW = species.filter((element) => element.location === 'NW');
  const SE = species.filter((element) => element.location === 'SE');
  const SW = species.filter((element) => element.location === 'SW');
  return { NE, NW, SE, SW };
}

function undefinedSex(neResident, nwResident, seResident, swResident) {
  const neResidentBySex = neResident.map((element) =>
    element.map((elementResident) => elementResident.name));
  const nwResidentBySex = nwResident.map((element) =>
    element.map((elementResident) => elementResident.name));
  const seResidentBySex = seResident.map((element) =>
    element.map((elementResident) => elementResident.name));
  const swResidentBySex = swResident.map((element) =>
    element.map((elementResident) => elementResident.name));
  return { NE: neResidentBySex, NW: nwResidentBySex, SE: seResidentBySex, SW: swResidentBySex };
}

function maleOrFemaleSex(sex, neResident, nwResident, seResident, swResident) {
  let neResidentBySex = neResident.map((element) =>
    element.filter((elementResidents) => elementResidents.sex === sex));
  neResidentBySex = neResidentBySex.map((element) =>
    element.map((elementResidents) => elementResidents.name));
  let nwResidentBySex = nwResident.map((element) =>
    element.filter((elementResidents) => elementResidents.sex === sex));
  nwResidentBySex = nwResidentBySex.map((element) =>
    element.map((elementResidents) => elementResidents.name));
  let seResidentBySex = seResident.map((element) =>
    element.filter((elementResidents) => elementResidents.sex === sex));
  seResidentBySex = seResidentBySex.map((element) =>
    element.map((elementResidents) => elementResidents.name));
  let swResidentBySex = swResident.map((element) =>
    element.filter((elementResidents) => elementResidents.sex === sex));
  swResidentBySex = swResidentBySex.map((element) =>
    element.map((elementResidents) => elementResidents.name));
  return { NE: neResidentBySex, NW: nwResidentBySex, SE: seResidentBySex, SW: swResidentBySex };
}

function checkSexFunction(options, NE, NW, SE, SW) {
  const { sex } = options;
  if (sex === undefined) {
    return undefinedSex(NE, NW, SE, SW);
  }
  return maleOrFemaleSex(sex, NE, NW, SE, SW);
}

function getAnimals(options) {
  let { NE, NW, SE, SW } = onlyLocationOfAnimals();
  NE = NE.map((element) => element.residents);
  NW = NW.map((element) => element.residents);
  SE = SE.map((element) => element.residents);
  SW = SW.map((element) => element.residents);
  const residentsBySex = checkSexFunction(options, NE, NW, SE, SW);
  return residentsBySex;
}

function linkNames(region, residents) {
  let linkAnimalsWithResidents = onlyLocationOfAnimals()[region];
  linkAnimalsWithResidents = linkAnimalsWithResidents.map((element) => element.name);
  linkAnimalsWithResidents = linkAnimalsWithResidents.map((element, index) => {
    const animals = {};
    animals[element] = residents[index];
    return animals;
  });
  return linkAnimalsWithResidents;
}

function withIncludeNames(options) {
  const { sorted } = options;
  let { NE, NW, SE, SW } = getAnimals(options);
  if (sorted === true) {
    NE.forEach((element) => element.sort());
    NW.forEach((element) => element.sort());
    SE.forEach((element) => element.sort());
    SW.forEach((element) => element.sort());
  }
  NE = linkNames('NE', NE);
  NW = linkNames('NW', NW);
  SE = linkNames('SE', SE);
  SW = linkNames('SW', SW);
  return { NE, NW, SE, SW };
}

function getAnimalMap(options) {
  // seu código aqui
  if (options === undefined || options.includeNames !== true) {
    return onlyNameOfAnimals();
  }
  return withIncludeNames(options);
}

module.exports = getAnimalMap;
