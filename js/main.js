console.log('Удачи')
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if(localStorage.getItem('tasks')) {
  
  tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks)
  tasks.forEach((task) => {
    renderTask (task)
  })
}



checkEmpyList();

//добавление задачи
form.addEventListener('submit', addTask);

// удаление задачи

tasksList.addEventListener('click', deleteTask)

//отмечание задачи как завершенной

tasksList.addEventListener('click', doneTask)
/*
if(localStorage.getItem('tasksHTML')) {
  tasksList.innerHTML= localStorage.getItem('tasksHTML');
}*/


function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value; /* вводимый текст*/

  //описываем задачу ввиде обьекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  }

  //добавляем задачу в массив с задачами
  tasks.push(newTask);

  console.log(tasks);

//формируем css class
renderTask (newTask)

  //очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();
  checkEmpyList();
  saveToLacalStorage ();
 }

function deleteTask(event) {

  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.list-group-item');

    //определяем id задачи
   const id =parentNode.id;

   //находим индекс задачи в массиве
   
   //const index = tasks.findIndex(function(task){
   // if(task.id==id){
   //   return true;
  //  }
  // })
  
   //удаляем задачу из массива
  // tasks.splice(index, 1);


  //удаляем задачу из массива через фильтрацию массива

  tasks=tasks.filter(function(task){
    if(task.id==id) {
      return false
    }else {
      return true
    }
  })
  saveToLacalStorage ()
  console.log(tasks)
    parentNode.remove();
    checkEmpyList();

   /* if (tasksList.children.length <= 1) {
      emptyList.classList.remove('none');
    }*/
  }
  //saveHTMLtoLS ()
 
}
function doneTask(event) {
  const parentNode = event.target.closest('.list-group-item');

  //определяем id задачи
  const id = parentNode.id;

  const task = tasks.find(function(task){
    if(task.id==id){
      return true
    }
  })
  task.done = !task.done
  console.log(task)
  saveToLacalStorage ()
  const taskTitle = parentNode.querySelector('.task-title')
  taskTitle.classList.toggle('task-title--done');
  //saveHTMLtoLS ()
}

function checkEmpyList(){
  if(tasks.length==0){
    const emptyListHTML = `
    <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">To-do list is empty</div>
				</li>
    `;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);  
  }
    if(tasks.length > 0){
    const emptyListEl = document.querySelector('#emptyList');
    
    emptyListEl ? emptyListEl.remove() : null;
    
  }

}

//чтобы записать в localStorage=> localStorage.setItem('tasks', JSON.stringify(tasks))

function saveToLacalStorage () {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask (task) {
  //формируем css class
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  //условие ? if true : if false;

  /*формируем разметку для новой задачи*/

  const taskHTML = `	<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item" >
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                          <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                          </button>
                          <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                          </button>
                        </div>
                      </li>`

  // добавляем задачу на страницу                   
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
























//сохранение данных в lochal storage

   // f12-> application->storage->local Storage
   //чтобы записать - localStorage.setItem('name', 'Natali')  => name: 'Natali';(name -ключ)
  //чтобы получить - localStorage.getItem('name') => 'Natali'
     
 /*       // 1й способ - не правильный

function saveHTMLtoLS () {
  localStorage.setItem('tasksHTML', tasksList.innerHTML);
  //innerHTML возвращает всю HTML разметку элемента
}*/
       // 2й способ:


