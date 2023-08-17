import {addButton, cancelButton, 
    addButtonEdit,
    inputTitle, inputDescription, 
    inputEditTitle, inputEditDescription,
    delAll, timeForTodos,
    counterOne, counterTwo, counterThree} from "./variables.js";

import {createTodo, createInprogress, createDone,
  parentOfAllTodos, parentOfAllInprogress, parentOfAllDone, 
  selectUser, listOfUsers, selectEditUser, listEditUsers,
  addToLocalStorage, addUser, addEditUser} from "./functions.js";

//массивы для хранения данных
let todo = [];
let inprogress = [];
let done = [];

let idEdit;
let taskToEdit;
let indexEditElement;

//получаем массивы из local storage
getTodoFromLocalStorage();
getInprogressFromLocalStorage();
getDoneFromLocalStorage();

selectUser.innerText = "Select user";

//подтягиваем пользователей, генерируем список
  //для создания задачи
  selectUser.addEventListener("click", async function(){
    const allUsers = document.querySelectorAll('.user-to-select');
    let users = await getUsers();
    if (allUsers.length < users.length){
      for (let i = 0; i < users.length; i++){
          addUser(users[i])
      }
    }
  })
  //для редактирования задачи
  selectEditUser.addEventListener("click", async function(){
    const allUsers = document.querySelectorAll('.user-to-edit');
    let users = await getUsers();
    if (allUsers.length < users.length){
      for (let i = 0; i < users.length; i++){
          addEditUser(users[i])
      }
    }
  })
async function getUsers(){
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await response.json();
  return users
}

//выбор пользователя при создании задачи
listOfUsers.addEventListener("click", function(event){
  if (event.target.dataset.action === "select"){
    const selectedUser = event.target.closest(".user-to-select");
    getUsers().then(data => {
      let users = data;
      const idOfUser = selectedUser.getAttribute("id");
      users.forEach (function(element) {
        if(element.id == idOfUser){
          selectUser.innerText = element.username;
        }
      })
    })
  }
})

//выбор пользователя при редактировании задачи
listEditUsers.addEventListener("click", function(event){
  if (event.target.dataset.action === "select"){
    const selectedUser = event.target.closest(".user-to-edit");
    getUsers().then(data => {
      let users = data;
      const idOfUser = selectedUser.getAttribute("id");
      users.forEach (function(element) {
        if(element.id == idOfUser){
          selectEditUser.innerText = element.username;
        }
      })
    })
  }
})

//генерируем задачи, исходя из полученных массивов
if(todo.length !== 0) {
  for (let i = 0; i < todo.length; i++){
      createTodo(todo[i]);
      counterOne.innerText = todo.length;
  }
}
if(inprogress.length !== 0) {
  for (let i = 0; i < inprogress.length; i++){
      createInprogress(inprogress[i]);
      counterTwo.innerText = inprogress.length;
  }
}
if(done.length !== 0) {
  for (let i = 0; i < done.length; i++){
      createDone(done[i]);
      counterThree.innerText = done.length;
  }
}

//добавление задачи
addButton.addEventListener("click", function(){
  if(inputTitle.value !== "" 
    && inputDescription.value !== ""
    && selectUser.innerText !== "Select user"){
    let newTask = {
      id: Date.now(),
      title: inputTitle.value,
      description: inputDescription.value,
      user: selectUser.innerText,
      time: timeForTodos,
    }
    //залить обьект в массив, сгенерировать задачу
    todo.push(newTask);
    createTodo(newTask);
    //очистка инпутов
    inputTitle.value = "";
    inputDescription.value = "";
    //считаем количество задач и выводим в хедер
    let howManyTasks = todo.length;
    counterOne.innerText = howManyTasks;
    addToLocalStorage("todo", todo);
    selectUser.innerText = "Select user";
  } else {
    alert("Warning! The task will not be added until you fill in all the input fields and select a user. Please, fill in the fields again.");
    inputTitle.value = "";
    inputDescription.value = "";
    selectUser.innerText = "Select user";
  }
})

//очистка инпутов при отмене ввода задачи
cancelButton.addEventListener("click", function(){
    inputTitle.value = "";
    inputDescription.value = "";
    selectUser.innerText = "Select user";
})

//кнопка редактирования задачи
parentOfAllTodos.addEventListener("click", function(event){
  if (event.target.dataset.action === "edit") {
    taskToEdit = event.target.closest(".task-todo");
    idEdit = taskToEdit.getAttribute("id");
    todo.forEach ((element, index) => {
      if(element.id == idEdit){
        indexEditElement = index;
        inputEditTitle.value = `${todo[indexEditElement].title}`;
        inputEditDescription.value = `${todo[indexEditElement].description}`;
        selectEditUser.innerText = `${todo[indexEditElement].user}`;
      }
    })
  }
})

//удаление задачи из списка и из массива в туду
parentOfAllTodos.addEventListener("click", function(event){
  if (event.target.dataset.action === "delete"){
    const taskToRemove = event.target.closest(".task-todo");
    taskToRemove.remove();
    const idRemoved = taskToRemove.getAttribute("id");
    todo.forEach (function(element, index) {
      if(element.id == idRemoved){
        todo.splice(index, 1);
        let howManyTasks = todo.length;
        counterOne.innerText = howManyTasks;
        addToLocalStorage("todo", todo);
      }
    })
  }
})

//кнопка добавления отредаченной задачи
addButtonEdit.addEventListener("click", function(){
  if (inputEditTitle.value !== "" 
  && inputEditDescription.value !== ""){
    todo.forEach ((e, i) => {
      if(idEdit == e.id) {
        
        todo[indexEditElement].title = inputEditTitle.value;
        todo[indexEditElement].description = inputEditDescription.value;
        todo[indexEditElement].time = timeForTodos;
        todo[indexEditElement].user = selectEditUser.textContent;

        document.getElementsByClassName("task-todo-title__title")[i]
        .textContent = todo[indexEditElement].title;
        
        document.getElementsByClassName("task-todo-description__info")[i]
        .textContent = todo[indexEditElement].description;

        document.getElementsByClassName("task-todo-user__time")[i]
        .textContent = todo[indexEditElement].time;

        document.getElementsByClassName("task-todo-user__user-name")[i]
        .textContent = todo[indexEditElement].user;

        taskToEdit.classList.toggle("edit");
        addToLocalStorage("todo", todo);
      }
    })
  } else {
    alert("Do not leave input fields empty, otherwise you will not be able to edit your task.")
  }
})

//переместить в инпрогресс
parentOfAllTodos.addEventListener("click", function(event){
  if (event.target.dataset.action === "check"){
    const taskToRelocate = event.target.closest(".task-todo");
    const idRemoved = taskToRelocate.getAttribute("id");
    todo.forEach (function(element, index) {
      if(element.id == idRemoved){
        if (inprogress.length < 6){
          taskToRelocate.remove();
          const newData = todo.splice(index, 1)[0];
          createInprogress(newData);
          inprogress.push(newData);
          let howManyTasks = todo.length;
          counterOne.innerText = howManyTasks;
          let howManyTasksInp = inprogress.length;
          counterTwo.innerText = howManyTasksInp;
          addToLocalStorage("todo", todo);
          addToLocalStorage("inprogress", inprogress);
        } else {
          alert("Oops! Unfortunately, you can't add more than 6 tasks here.")
        }
      }
    })
  }
})

//переместить в todo
parentOfAllInprogress.addEventListener("click", function(event){
  if (event.target.dataset.action === "back"){
    const taskToTodo = event.target.closest(".task-inprogress");
    const idRemoved = taskToTodo.getAttribute("id");
    inprogress.forEach (function(element, index) {
      if(element.id == idRemoved){
        taskToTodo.remove();
        const newTask = inprogress.splice(index, 1)[0];
        createTodo(newTask);
        todo.push(newTask);
        let howManyTasks = todo.length;
        counterOne.innerText = howManyTasks;
        let howManyTasksInp = inprogress.length;
        counterTwo.innerText = howManyTasksInp;
        addToLocalStorage("todo", todo);
        addToLocalStorage("inprogress", inprogress);
      }
    })
  }
})

//переместить в доне
parentOfAllInprogress.addEventListener("click", function(event){
  if (event.target.dataset.action === "complete"){
    const taskToTodo = event.target.closest(".task-inprogress");
    const idRemoved = taskToTodo.getAttribute("id");
    inprogress.forEach (function(element, index) {
      if(element.id == idRemoved){
        taskToTodo.remove();
        const taskDone = inprogress.splice(index, 1)[0];
        createDone(taskDone);
        done.push(taskDone);
        let howManyTasksInp = inprogress.length;
        counterTwo.innerText = howManyTasksInp;
        let howManyTasksDone = done.length;
        counterThree.innerText = howManyTasksDone;
        addToLocalStorage("inprogress", inprogress);
        addToLocalStorage("done", done);
      }
    })
  }
})

//удаление задачи из списка и из массива в доне
parentOfAllDone.addEventListener("click", function(event){
  if (event.target.dataset.action === "delete"){
    const doneRemove = event.target.closest(".task-done");
    doneRemove.remove();
    const idRemoved = doneRemove.getAttribute("id");
    done.forEach (function(element, index) {
      if(element.id == idRemoved){
        done.splice(index, 1);
        let howManyTasksDone = done.length;
        counterThree.innerText = howManyTasksDone;
        addToLocalStorage("done", done);
      }
    })
  }
})

//удаление всех задач в доне
delAll.addEventListener("click", function () {
  const deleteAll = document.querySelectorAll('.task-done');
  let delTask = confirm("Are you sure? You will not be able to cancel this action later.");
  if (delTask === true) {
  for (let i = 0; i < deleteAll.length; i++) {
    deleteAll[i].remove();
  }
  done.splice(0, done.length);
  let howManyTasksDone = done.length;
  counterThree.innerText = howManyTasksDone;
  addToLocalStorage("done", done);
  }
})

function getTodoFromLocalStorage(){
  if(localStorage.getItem("todo") !== null){
    todo = JSON.parse(localStorage.getItem("todo"))
  }
}
function getInprogressFromLocalStorage(){
  if(localStorage.getItem("inprogress") !== null){
    inprogress = JSON.parse(localStorage.getItem("inprogress"))
  }
}
function getDoneFromLocalStorage(){
  if(localStorage.getItem("done") !== null){
    done = JSON.parse(localStorage.getItem("done"))
  }
}