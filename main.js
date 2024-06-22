// DOM elements
let taskTitle = document.querySelector(".task-name");
let addBtn = document.querySelector('.add-btn');
let tasksCon = document.querySelector(".task-con");
let searchInp = document.querySelector('.filter');

// Tasks array
let tasks = [];

windowOnload()
// Load tasks from localStorage on page load
function windowOnload(){
    taskNum()
    if (localStorage.getItem('tasks')) {
        getTasksFromLS();
        tasks.forEach((task,index)=>{
            if(task.active == false){
                let taskElement = document.getElementById(index).parentElement;
                taskElement.style.backgroundColor = 'crimson';
            
                let iEl = document.createElement('i');
                iEl.id = index;
                iEl.classList.add('fa-solid', 'fa-trash', 'trash');
                iEl.setAttribute('onclick', 'removeTask(this.id)');
            
                taskElement.appendChild(iEl);
                taskElement.removeChild(document.getElementById(index));
            }
        })
    }
    
}

// Add new task
function setTask() {
    if (taskTitle.value.trim()) {
        tasks.push({ title: taskTitle.value, active: true });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        getTasksFromLS();
        windowOnload()
        taskTitle.value = '';
    }
    taskNum()
    
}

// Get tasks from localStorage
function getTasksFromLS() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksCon.innerHTML = '';
    taskNum()
    tasks.forEach((task, index) => {
      
            tasksCon.innerHTML += `
                <div class="task">
                    <h3>${task.title}</h3>
                    <span class="remove-btn" id="${index}" onclick="endTask(${index})">&CircleMinus;</span>
                </div>
            `;
    });
    
}

// End task
function endTask(id) {
    tasks[id].active = false;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let taskElement = document.getElementById(id).parentElement;
    taskElement.style.backgroundColor = 'crimson';

    let iEl = document.createElement('i');
    iEl.id = id;
    iEl.classList.add('fa-solid', 'fa-trash', 'trash');
    iEl.setAttribute('onclick', 'removeTask(this.id)');
    taskNum()
    taskElement.appendChild(iEl);
    taskElement.removeChild(document.getElementById(id));
    windowOnload();
}

// Remove task
function removeTask(id) {
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasksFromLS();
    windowOnload()
    taskNum();   
}

// Search engine function
function searchEngine() {
    let searchQuery = searchInp.value.trim().toLowerCase();
    let tasksElements = document.querySelectorAll('.task');

    tasksElements.forEach(element => {
        let taskName = element.querySelector('h3').textContent.trim().toLowerCase();

        if (taskName.startsWith(searchQuery)) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}
taskNum()
function taskNum(){
    let trueNums = 0;
    let falseNums = 0;

    tasks.forEach(task => {
        if(task.active){
            trueNums++;
        } else {
            falseNums++;
        }
    });

    document.querySelector('.aque').innerHTML ='Task Count: '+trueNums.toString(); // عرض عدد الأنشطة الحقيقية
    document.querySelector('.red').innerHTML = "Ended Task Count: "+falseNums.toString(); // عرض عدد الأنشطة الحقيقية

}
