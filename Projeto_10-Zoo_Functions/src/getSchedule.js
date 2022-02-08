const data = require('../data/zoo_data');

function getAnimalsByDayFunction(days) {
  const { species } = data;
  const animals = days.map((day) =>
    species.filter((animal) => animal.availability.includes(day)).map((animalName) =>
      animalName.name));
  return animals;
}

function generalScheduleFunction(days, hours, animalsByDay) {
  const schedule = {};
  for (let index = 0; index < days.length; index += 1) {
    if (days[index] !== 'Monday') {
      schedule[days[index]] = {
        officeHour: `Open from ${hours[index].open}am until ${hours[index].close}pm`,
        exhibition: animalsByDay[index],
      };
    } else {
      schedule[days[index]] = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
    }
  }
  return schedule;
}

function daysByAnimal(scheduleTarget) {
  const { species } = data;
  const daysAnimal = species.find((element) => element.name === scheduleTarget);
  return daysAnimal.availability;
}

function scheduleWithParameters(scheduleTarget, days, schedule) {
  const generalSchedule = schedule;
  if (scheduleTarget === 'Monday') {
    const { Monday } = generalSchedule;
    return { Monday };
  }
  if (days.includes(scheduleTarget)) {
    const daySelected = {};
    daySelected[scheduleTarget] = generalSchedule[scheduleTarget];
    return daySelected;
  }
  return daysByAnimal(scheduleTarget);
}

function getSchedule(scheduleTarget) {
  // seu código aqui
  const days = Object.keys(data.hours);
  const hours = Object.values(data.hours);
  const animalsByDay = getAnimalsByDayFunction(days);
  const generalSchedule = generalScheduleFunction(days, hours, animalsByDay);
  const allAnimals = data.species.map((element) => element.name);
  const checkDaysAndAnimals = days.includes(scheduleTarget) || allAnimals.includes(scheduleTarget);
  if (scheduleTarget === undefined || checkDaysAndAnimals !== true) {
    return generalSchedule;
  }
  return scheduleWithParameters(scheduleTarget, days, generalSchedule);
}

module.exports = getSchedule;
