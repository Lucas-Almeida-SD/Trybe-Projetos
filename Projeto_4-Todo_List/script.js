function addTask() {
  function pushTask(value) {
    const ordenedList = document.getElementsByTagName('ol')[0];
    const newLi = document.createElement('li');
    newLi.innerText = value;
    ordenedList.appendChild(newLi);
    document.getElementById('texto-tarefa').value = '';
  }

  function getInput() {
    const inputBox = document.getElementById('texto-tarefa').value;
    if (inputBox !== '') {
      pushTask(inputBox);
    }
  }
  const buttonTask = document.getElementById('criar-tarefa');
  buttonTask.addEventListener('click', getInput);
}

function changeBackgroundOfSelectedItem() {
  const listOfTasks = document.getElementById('lista-tarefas');

  function selectListItem(event) {
    const checkSelected = document.querySelector('.selected');
    if (checkSelected !== null) {
      checkSelected.classList.remove('selected');
    }
    event.target.classList.add('selected');
  }
  listOfTasks.addEventListener('click', selectListItem);
}

function markListItemAsCompleted() {
  const listOfTasks = document.getElementById('lista-tarefas');

  function putLineThrough(event) {
    const checkCompletedTask = event.target.classList.contains('completed');
    if (checkCompletedTask === false) {
      event.target.classList.add('completed');
    } else {
      event.target.classList.remove('completed');
    }
  }
  listOfTasks.addEventListener('dblclick', putLineThrough);
}

function clearAllTasks() {
  const clearAllButton = document.querySelector('#apaga-tudo');

  function clean() {
    const tasks = document.getElementsByTagName('li');
    for (; tasks.length > 0;) {
      tasks[0].remove();
    }
  }
  clearAllButton.addEventListener('click', clean);
}

function clearCompletedTasks() {
  const buttonOfRemoveCompletedTasks = document.querySelector('#remover-finalizados');

  function removeCompletedTasks() {
    const completedTasks = document.getElementsByClassName('completed');
    for (; completedTasks.length > 0;) {
      completedTasks[0].remove();
    }
  }
  buttonOfRemoveCompletedTasks.addEventListener('click', removeCompletedTasks);
}

function sendTasksToStorage(list) {
  const listOfContent = [];
  const listOfClass = [];
  for (let index = 0; index < list.length; index += 1) {
    listOfContent.push(list[index].innerText);
    listOfClass.push(list[index].getAttribute('class'));
  }
  localStorage.setItem('tasks', JSON.stringify(listOfContent));
  localStorage.setItem('class', JSON.stringify(listOfClass));
}

function saveTasks() {
  const buttonOfSaveTasks = document.querySelector('#salvar-tarefas');

  function getTasksToSave() {
    const listOfTasks = document.getElementsByTagName('li');
    if (listOfTasks.length > 0) {
      sendTasksToStorage(listOfTasks);
    } else {
      localStorage.clear();
    }
    window.alert('Lista salva com sucesso!');
  }
  buttonOfSaveTasks.addEventListener('click', getTasksToSave);
}

function createAListItem(tasks, classes, index) {
  const element = document.createElement('li');
  if (classes[index] !== null && classes[index] !== '') {
    element.className = classes[index];
  }
  element.innerText = tasks[index];
  return element;
}

function loadSavedTasks() {
  const listOftasksAtStorage = JSON.parse(localStorage.getItem('tasks'));
  const listOfClassAtStorage = JSON.parse(localStorage.getItem('class'));
  if (listOftasksAtStorage !== null) {
    const listOfTasksAtPage = document.querySelector('#lista-tarefas');
    for (let index = 0; index < listOftasksAtStorage.length; index += 1) {
      const li = createAListItem(listOftasksAtStorage, listOfClassAtStorage, index);
      listOfTasksAtPage.appendChild(li);
    }
  }
}

function chagePositionsUp(selectedItem, listItem) {
  if (selectedItem !== null && selectedItem !== listItem.firstElementChild) {
    let checkItem = listItem.firstElementChild;
    for (; checkItem !== selectedItem;) {
      checkItem = checkItem.nextElementSibling;
    }
    const item = selectedItem;
    const previousItem = checkItem.previousElementSibling;
    const contentOFSelected = selectedItem.innerText;
    const classOfSelected = selectedItem.getAttribute('class');
    const contentOfPrevious = previousItem.innerText;
    const classOfPrevious = previousItem.getAttribute('class');
    item.innerText = contentOfPrevious;
    item.className = classOfPrevious;
    previousItem.innerText = contentOFSelected;
    previousItem.className = classOfSelected;
  }
}

function chagePositionsDown(selectedItem, listItem) {
  if (selectedItem !== null && selectedItem !== listItem.lastElementChild) {
    let checkItem = listItem.firstElementChild;
    for (; checkItem !== selectedItem;) {
      checkItem = checkItem.nextElementSibling;
    }
    const item = selectedItem;
    const nextItem = checkItem.nextElementSibling;
    const contentOFSelected = selectedItem.innerText;
    const classOfSelected = selectedItem.getAttribute('class');
    const contentOfNext = nextItem.innerText;
    const classOfNext = nextItem.getAttribute('class');
    item.innerText = contentOfNext;
    item.className = classOfNext;
    nextItem.innerText = contentOFSelected;
    nextItem.className = classOfSelected;
  }
}

function upAndDownButton() {
  const upButton = document.getElementById('mover-cima');
  const downButton = document.getElementById('mover-baixo');
  const listItem = document.getElementsByTagName('ol')[0];

  function checkButtonSelected(event) {
    const selectedItem = document.querySelector('.selected');
    if (event.target === upButton) {
      chagePositionsUp(selectedItem, listItem);
    }
    if (event.target === downButton) {
      chagePositionsDown(selectedItem, listItem);
    }
  }
  upButton.addEventListener('click', checkButtonSelected);
  downButton.addEventListener('click', checkButtonSelected);
}

function removeSelectedItemButton() {
  const removeButton = document.querySelector('#remover-selecionado');

  function checkSelected() {
    const selectedItem = document.querySelector('.selected');
    if (selectedItem !== null) {
      selectedItem.remove();
    }
  }

  removeButton.addEventListener('click', checkSelected);
}

loadSavedTasks();
addTask();
changeBackgroundOfSelectedItem();
markListItemAsCompleted();
clearAllTasks();
clearCompletedTasks();
saveTasks();
upAndDownButton();
removeSelectedItemButton();
