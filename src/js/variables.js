export { addButton, cancelButton, 
    addButtonEdit,
    inputTitle, inputDescription, 
    inputEditTitle, inputEditDescription,
    delAll, timeForTodos,
    counterOne, counterTwo, counterThree}

//кнопки добавления задачи и отмены добавления (из модального окна)
const addButton = document.getElementsByClassName("addTodo-button")[0];
const cancelButton = document.getElementsByClassName("cancel-button")[0];
//те же кнопка, но для окна редактирования
const addButtonEdit = document.getElementsByClassName("addTodo-button")[1];

//инпут заголовка и задачи
const inputTitle = document.getElementsByClassName("modal-inputTitle")[0];
const inputDescription = document.getElementsByClassName("modal-inputDescription")[0];
//инпут в окне редактиррования
const inputEditTitle = document.getElementsByClassName("modal-inputEditTitle")[0];
const inputEditDescription = document.getElementsByClassName("modal-inputEditDescription")[0];

//кнопка "удалить все"
const delAll = document.getElementsByClassName("container-done__footer")[0];

//время для поля с задачей и объекта
let timeForTodos = 0;
setInterval(function () {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  timeForTodos = hours + ":" + minutes;
}, 1000);

//счетчик задач
const counterOne = document.getElementsByClassName("todo-header__counter")[0];
const counterTwo = document.getElementsByClassName("inprogress-header__counter")[0];
const counterThree = document.getElementsByClassName("done-header__counter")[0];