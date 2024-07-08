document.getElementById('btn').addEventListener('click', print);

window.onload = function () {
  console.log('Page fully loaded');
  autoload();
};

function autoload() {
  let TaskDate    = new Date().toJSON().slice(0, 10);
  let tasksArray  = JSON.parse(localStorage.getItem(TaskDate));

  if (tasksArray !== null && tasksArray.length > 0) {
      tasksArray.forEach(task => {
      Make_list(task.TaskName, task.Input_time, task.status);
    });
  }
}

function print() {
  let TaskDate    = new Date().toJSON().slice(0, 10);

  let date = document.getElementById("task-deadline");
  let taskName = document.getElementById("InputTask");
  if (taskName.value === ''|| date.value === '') {
    alert('Have you enterd Taskname and Taskdate both?',img3,6000);
    return;
  }

  const task = {
      TaskName: taskName.value,
      Input_time: new Date(date.value).getTime(),
      status: false,
  };

  function saveTaskToLocalStorage(task) {
      let tasks = JSON.parse(localStorage.getItem(TaskDate)) || [];
      tasks.push(task);
      localStorage.setItem(TaskDate, JSON.stringify(tasks));
  }

  saveTaskToLocalStorage(task);

  let tasksArray  = JSON.parse(localStorage.getItem(TaskDate));
  let tasksArrayLength = tasksArray.length;

  if (tasksArray !== null && tasksArrayLength > 0) {
    Make_list(tasksArray[tasksArrayLength - 1].TaskName, tasksArray[tasksArrayLength - 1].Input_time, tasksArray[tasksArrayLength - 1].status);
  }
  taskName.value = '';
  date.value     = '';
}

function Make_list(Task_Name, User_Input_Value,status) {

  let listArea = document.getElementById('mytext');
  let list = document.createElement("li");
  list.classList.add('task_list');

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked=status;
  checkbox.classList.add('custom-checkbox');

  let span  = document.createElement('ion-icon');
  span.name = status?"checkmark-circle":"checkmark-circle-outline"; 
  let label = document.createElement('label');

  let taskSpace = document.createElement('span');
  taskSpace.textContent = Task_Name;
  taskSpace.classList.add('task_name');

  label.appendChild(checkbox);
  label.appendChild(span);

  let button  = document.createElement('ion-icon');
  button.name = "trash-outline";

  button.addEventListener('click',(event) => {
    target(event);
  });

  const countDown = document.createElement('span');
  countDown.classList.add('countDown_time');

  let interval_Id;

  checkbox.addEventListener('change', function (event) {
          let checked = checkbox.checked;
          span.name= checked?"checkmark-circle":"checkmark-circle-outline";
          taskSpace.style.textDecoration = checked?"line-through":"none";
          countDown.style.textDecoration = checked?"line-through":"none";
          UpdateTask_status(event,checked);

          if(checkbox.checked){
            clearInterval(interval_Id);
          }
          else{
            interval_Id = setInterval(Update_timer,1000);
          }          
  });

  function Update_timer(){
      countDown.textContent = timer(User_Input_Value);
    if(countDown.textContent === 'TIMES is up!') {
        clearInterval(interval_Id);
        // alert(`Task ${Task_Name} is overdue!`);
        alert(`Task ${Task_Name} is overdue!`,img2, 6000);
    }
  }
    if (!status) {
      interval_Id = setInterval(Update_timer,1000);
    }
    else{
      span.name="checkmark-circle";
      taskSpace.style.textDecoration = "line-through";
      countDown.style.textDecoration = "line-through";
    }

  list.appendChild(label);
  list.appendChild(taskSpace);
  list.appendChild(countDown);
  list.appendChild(button)
  listArea.appendChild(list);

}

function UpdateTask_status(event,state) {
  let TaskDate = new Date().toJSON().slice(0, 10);
  let Saved_Array = JSON.parse(localStorage.getItem(TaskDate));
  let element = event.target;
  let span = element.parentElement;
  let parentElement = span.parentElement;
  let targetText = parentElement.children[1].textContent;

  Saved_Array = Saved_Array.map(tasks => {
    if (tasks.TaskName === targetText) {
      tasks.status = state;
    }
    return tasks;
  });

  localStorage.setItem(TaskDate, JSON.stringify(Saved_Array));
  alert('Task status saved',img1,6000);
}






// function callAlert2(msg) {
//   
// }






function target(event) {
  TaskDate = new Date().toJSON().slice(0, 10);
  let task_Array = JSON.parse(localStorage.getItem(TaskDate));

  let element = event.target;
  let parentElement = element.parentElement;
  let targetText = element.parentElement.children[1].textContent;

  parentElement.remove();
  let newArray = task_Array.filter(item => item.TaskName !== targetText);

  localStorage.setItem(TaskDate, JSON.stringify(newArray))
}



function timer(Input) {

  let Current_Time = new Date().getTime();
  let gap = Input - Current_Time;

  if (gap >= 0) {
    let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((gap % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`
  } else {
    return 'TIMES is up!';
    
  }
}


let img2= '<img src="images/TimesUp.gif" alt="GIF" style="width:100px; height:100px; margin-top:10px;">';
let img1= '<img src="images/EMO_051.gif" alt="GIF" style="width:100px; height:100px; margin-top:10px;">';
let img3= '<img src="images/Qoobe_question.gif" alt="GIF" style="width:100px; height:100px; margin-top:10px;">';

window.alert = function(message, im,timeout = null) {
  // Create alert container
  const imgContainer = document.createElement('div');
  imgContainer.innerHTML = im;

  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.setAttribute('style', `
      position:fixed;
      top:100px;
      left:50%;
      transform:translateX(-50%);
      padding:20px;
      border-radius:10px;
      box-shadow:0 10px 5px 0 #00000022;
      display:flex;
      flex-direction:column;
      align-items:center;
      background:#fff;
      border:1px solid #333;
      font-family: "Quicksand", sans-serif;
      z-index:1000;
  `);

  // Create message element
  const messageElement = document.createElement('span');
  messageElement.innerText = message;

  // Create button
  const alertButton = document.createElement('button');
  alertButton.innerText = 'OK';
  alertButton.setAttribute('style', `
      border:1px solid #333;
      background: white;
      border-radius:5px;
      padding:2.5px;
      margin-top:10px;
      font-size:1rem;
      cursor:pointer;
      font-family: "Teachers", sans-serif;
  `);

  // Append message and button to alert container
  alert.appendChild(messageElement);
  alert.appendChild(alertButton);

  // Add event listener to button
  alertButton.addEventListener('click', () => {
      alert.remove();
  });

  // Create GIF container
 
  // Append GIF container to alert
  alert.appendChild(imgContainer);

  // Append alert to body
  document.body.appendChild(alert);

  // Auto-remove alert after timeout
  if (timeout != null) {
      setTimeout(() => {
          alert.remove();
      }, Number(timeout));
  }
};

