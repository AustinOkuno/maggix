// global variables
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.getElementById('clear-btn');

//load array from local storage, if empty instantiate to empty array
let tasksArray = JSON.parse(localStorage.getItem('savedTasks')) ?? [];
renderList()

// ADD TASK LOGIC  
input.addEventListener('keydown', (event) => {
    if ( event.key === 'Enter') {
        addTask()
    }
})
function addTask() {
    const text = input.value.trim();    
    if (text.length !== 0) { // skip empty tasks
        tasksArray.push({
            text: text,
            done: false
        });    
    }
    input.value = ''; // reset input box after hitting enter
    renderList()
} 
//
// DELETE TASK LOGIC / CLEAR
function deleteTask(index) {
    tasksArray.splice(index, 1);
    renderList();
}
// CLEAR 
clear.addEventListener("click", () => {
    input.value = ''
    tasksArray = [] 
    renderList();
})
//

// CLICKS LOGIC
list.addEventListener('click', (event) => {
    
    const taskEl = event.target.closest('.task'); // find which task wrapper
    if (!taskEl) return; //click empty space - ignore

    const index = Number(taskEl.dataset.index); // define which task by index in via HTML dataset

    const action  = event.target.closest('[data-action]')?.dataset.action //find nearest el by action via HTML dataset, if nothing return undef

    if (action === 'delete') {
        deleteTask(index);
    }
    else if (action === 'toggle') {
        toggleTask(index);
    }
});

//  TOGGLE FUNC - Mark Done / not done -->
function toggleTask(index) {
    const task = tasksArray[index]

    task.done = !task.done // emulate toggle of check/uncheck button - flip bool value

    tasksArray.splice(index, 1); // take out cur spot

    if(task.done) {
        tasksArray.push(task); //done - move to bottom
    }
    else {
        tasksArray.unshift(task) //not done move to top
    }
    renderList();
}
//
// RENDER + SAVE , rebuild whole list based off tasksArray, then save to local storage
function renderList() {
    let addedHTML = '';

    for (let i = 0; i < tasksArray.length; i ++) {
        const curTask = tasksArray[i];

        // ternary logic -> ifTrue ? ifFalse
        const doneClass = curTask.done ? 'done' : '';
        const icon = curTask.done ? '' : '';

        //data-index = which task, data-action = what clicking does
        addedHTML += 
            `<div class="task ${doneClass}" data-index="${i}"> 
                <span data-action="toggle"> ${icon} >> ${curTask.text}</span>
                <button class="trash-btn"data-action="delete">del</button>
            </div>`;
    
    };

    list.innerHTML = addedHTML
    //console.log(tasksArray) // see array in console
    //save to local storage
    localStorage.setItem('savedTasks', JSON.stringify(tasksArray));
}

//  clock sec.
const clock = document.getElementById('clock');
function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString([], { //present time 12:36:14
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    const date = now.toLocaleDateString()   //10/29/2026

    const wordedDate = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    clock.textContent = `${time} ~ ${date} ~ ${wordedDate}`
}
updateClock();
setInterval(updateClock, 1000)
//