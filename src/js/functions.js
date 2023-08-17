export {createTodo, createInprogress, createDone,
    parentOfAllTodos, parentOfAllInprogress, parentOfAllDone, 
    selectUser, listOfUsers, selectEditUser, listEditUsers,
    addToLocalStorage, addUser, addEditUser}

//родитель, в который генерируются все таски
  //для туду
  const parentOfAllTodos = document.getElementsByClassName("container-tasks")[0];
  //для инпрогресс
  const parentOfAllInprogress = document.getElementsByClassName("container-tasks")[1];
  //для доне
  const parentOfAllDone = document.getElementsByClassName("container-tasks")[2];

//кнопки и списки для выбора пользователя
  //при добавлении задачи
  const selectUser = document.querySelector(".dropdown-toggle");
  const listOfUsers = document.querySelector(".dropdown-menu");
  //при редактировании задачи
  const selectEditUser = document.getElementsByClassName("dropdown-toggle")[1];
  const listEditUsers = document.getElementsByClassName("dropdown-menu")[1];

//функция по созданию задачи
function createTodo(obj){
  //задача
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task-todo");
  todoDiv.setAttribute("id", `${obj.id}`)
  parentOfAllTodos.append(todoDiv);

  //див с заголовком и кнопками
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("task-todo-title");
  todoDiv.append(todoTitle);

    const todoTitleText = document.createElement("div");
    todoTitleText.classList.add("task-todo-title__title");
    todoTitleText.innerText = `${obj.title}`
    todoTitle.append(todoTitleText);

    const btnsTodo = document.createElement("div");
    btnsTodo.classList.add("btns-todo");
    todoTitle.append(btnsTodo);

      const btnsTodoEdit = document.createElement("button");
      btnsTodoEdit.classList.add("btns-todo__btn-edit");
      btnsTodoEdit.innerText = "EDIT";
      btnsTodoEdit.setAttribute("data-action", "edit");
      btnsTodoEdit.setAttribute("data-bs-toggle", "modal");
      btnsTodoEdit.setAttribute("data-bs-target", "#modalEdit");
      btnsTodo.append(btnsTodoEdit);

      const btnsTodoDelete = document.createElement("button");
      btnsTodoDelete.classList.add("btns-todo__btn-delete");
      btnsTodoDelete.innerText = "DELETE";
      btnsTodoDelete.setAttribute("data-action", "delete");
      btnsTodo.append(btnsTodoDelete);
      
  //див с текстом задачи и кнопкой
  const todoDesc = document.createElement("div");
  todoDesc.classList.add("task-todo-description");
  todoDiv.append(todoDesc);

    const todoDescInfo = document.createElement("div");
    todoDescInfo.classList.add("task-todo-description__info");
    todoDescInfo.innerText = `${obj.description}`
    todoDesc.append(todoDescInfo);

    const todoDescBtn = document.createElement("button");
    todoDescBtn.classList.add("btns-todo__btn-toInprogress");
    todoDescBtn.setAttribute("data-action", "check")
    todoDescBtn.innerText = ">"
    todoDesc.append(todoDescBtn);

  //див с пользователем и временем
  const todoUser = document.createElement("div");
  todoUser.classList.add("task-todo-user");
  todoDiv.append(todoUser);

    const todoUserName = document.createElement("div");
    todoUserName.classList.add("task-todo-user__user-name");
    todoUserName.innerText = `${obj.user}`
    todoUser.append(todoUserName);

    const todoUserTime = document.createElement("div");
    todoUserTime.classList.add("task-todo-user__time");
    todoUserTime.innerText = `${obj.time}`
    todoUser.append(todoUserTime);
}

//функция генерации задачи в поле инпрогресс
function createInprogress(obj){
  //задача
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task-inprogress");
  todoDiv.setAttribute("id", `${obj.id}`)
  parentOfAllInprogress.append(todoDiv);

  //див с заголовком и кнопками
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("task-inprogress-title");
  todoDiv.append(todoTitle);

    const todoTitleText = document.createElement("div");
    todoTitleText.classList.add("task-inprogress-title__title");
    todoTitleText.innerText = `${obj.title}`
    todoTitle.append(todoTitleText);

    const btnsTodo = document.createElement("div");
    btnsTodo.classList.add("btns-inprogress");
    todoTitle.append(btnsTodo);

      const btnsTodoEdit = document.createElement("button");
      btnsTodoEdit.classList.add("btns-inprogress__btn-back");
      btnsTodoEdit.setAttribute("data-action", "back");
      btnsTodoEdit.innerText = "BACK";
      btnsTodo.append(btnsTodoEdit);

      const btnsTodoDelete = document.createElement("button");
      btnsTodoDelete.classList.add("btns-inprogress__btn-complete");
      btnsTodoDelete.innerText = "COMPLETE";
      btnsTodoDelete.setAttribute("data-action", "complete")
      btnsTodo.append(btnsTodoDelete);
      
  //див с текстом задачи и кнопкой
  const todoDesc = document.createElement("div");
  todoDesc.classList.add("task-inprogress-description");
  todoDiv.append(todoDesc);

    const todoDescInfo = document.createElement("div");
    todoDescInfo.classList.add("task-inprogress-description__info");
    todoDescInfo.innerText = `${obj.description}`
    todoDesc.append(todoDescInfo);

  //див с пользователем и временем
  const todoUser = document.createElement("div");
  todoUser.classList.add("task-inprogress-user");
  todoDiv.append(todoUser);

    const todoUserName = document.createElement("div");
    todoUserName.classList.add("task-inprogress-user__user-name");
    todoUserName.innerText = `${obj.user}`
    todoUser.append(todoUserName);

    const todoUserTime = document.createElement("div");
    todoUserTime.classList.add("task-inprogress-user__time");
    todoUserTime.innerText = `${obj.time}`
    todoUser.append(todoUserTime);
}

//функция генерации задачи в поле доне
function createDone(obj){
  //задача
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task-done");
  todoDiv.setAttribute("id", `${obj.id}`)
  parentOfAllDone.append(todoDiv);

  //див с заголовком и кнопками
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("task-done-title");
  todoDiv.append(todoTitle);

    const todoTitleText = document.createElement("div");
    todoTitleText.classList.add("task-done-title__title");
    todoTitleText.innerText = `${obj.title}`
    todoTitle.append(todoTitleText);

    const btnsTodo = document.createElement("button");
    btnsTodo.classList.add("task-done-title__btn-delete");
    btnsTodo.innerText = "DELETE";
    btnsTodo.setAttribute("data-action", "delete");
    todoTitle.append(btnsTodo);

  //див с текстом задачи и кнопкой
  const todoDesc = document.createElement("div");
  todoDesc.classList.add("task-done-description");
  todoDiv.append(todoDesc);

    const todoDescInfo = document.createElement("div");
    todoDescInfo.classList.add("task-done-description__info");
    todoDescInfo.innerText = `${obj.description}`
    todoDesc.append(todoDescInfo);

  //див с пользователем и временем
  const todoUser = document.createElement("div");
  todoUser.classList.add("task-done-user");
  todoDiv.append(todoUser);

    const todoUserName = document.createElement("div");
    todoUserName.classList.add("task-done-user__user-name");
    todoUserName.innerText = `${obj.user}`
    todoUser.append(todoUserName);

    const todoUserTime = document.createElement("div");
    todoUserTime.classList.add("task-done-user__time");
    todoUserTime.innerText = `${obj.time}`
    todoUser.append(todoUserTime);
}

//функция TIME
setInterval(function () {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secondes = date.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (secondes < 10) secondes = "0" + secondes;
  
  document.querySelector(".trello-header__timer")
  .textContent = hours + ":" + minutes + ":" + secondes;
}, 100);

//сохранение а local storage
function addToLocalStorage(key, array){
  localStorage.setItem(key, JSON.stringify(array))
}

//функция генерации пользователей
function addUser(object){
  const list = document.createElement("li");
  list.setAttribute("id", `${object.id}`);
  list.classList.add("user-to-select")
  listOfUsers.append(list);

  const user = document.createElement("a");
  list.append(user);
  user.innerText = `${object.username}`;
  user.setAttribute("class", "dropdown-item");
  user.setAttribute("data-action", "select");
}

function addEditUser(object){
  const list = document.createElement("li");
  list.setAttribute("id", `${object.id}`);
  list.classList.add("user-to-edit")
  listEditUsers.append(list);

  const user = document.createElement("a");
  list.append(user);
  user.innerText = `${object.username}`;
  user.setAttribute("class", "dropdown-item");
  user.setAttribute("data-action", "select");
}
