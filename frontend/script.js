// global variables
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.getElementById('clear-btn');

//load array from local storage, if empty instantiate to empty array
let tasksArray = JSON.parse(localStorage.getItem('savedTasks')) ?? [];
let editingIndex = null; // which task is being edited, null = none
renderList()

// ADD TASK LOGIC
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
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

// DELETE TASK LOGIC
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

    const index = Number(taskEl.dataset.index); // define which task by index via HTML dataset

    const action = event.target.closest('[data-action]')?.dataset.action //find nearest el by action via HTML dataset, if nothing return undef

    if (action === 'delete') {
        deleteTask(index);
    }
    else if (action === 'toggle') {
        toggleTask(index);
    }
});
//

// TOGGLE FUNC - Mark Done / not done
function toggleTask(index) {
    const task = tasksArray[index]

    task.done = !task.done // emulate toggle of check/uncheck button - flip bool value

    tasksArray.splice(index, 1); // take out cur spot

    if (task.done) {
        tasksArray.push(task); //done - move to bottom
    }
    else {
        tasksArray.unshift(task) //not done move to top
    }
    renderList();
}
//

// EDIT TASK LOGIC
// double-click task text -> switch that task into edit mode
list.addEventListener('dblclick', (event) => {
    const taskEl = event.target.closest('.task');
    if (!taskEl) return;

    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action !== 'edit') return; // only the text is editable

    editingIndex = Number(taskEl.dataset.index);
    renderList();
});

// keys inside edit box: Enter = save, Escape = cancel
list.addEventListener('keydown', (event) => {
    if (!event.target.classList.contains('edit-input')) return;

    if (event.key === 'Enter') {
        saveEdit(event.target.value);
    }
    else if (event.key === 'Escape') {
        cancelEdit();
    }
});

// clicking away from edit box also saves
// focusout instead of blur - blur doesn't bubble up to list
list.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('edit-input')) {
        saveEdit(event.target.value);
    }
});

function saveEdit(newText) {
    if (editingIndex === null) return; // already saved/cancelled, stops double save

    const text = newText.trim();
    if (text.length !== 0) { // empty edit = keep old text
        tasksArray[editingIndex].text = text;
    }
    editingIndex = null;
    renderList();
}

function cancelEdit() {
    editingIndex = null; // drop changes
    renderList();
}
//

// RENDER + SAVE, rebuild whole list based off tasksArray, then save to local storage
function renderList() {
    let addedHTML = '';

    for (let i = 0; i < tasksArray.length; i++) {
        const curTask = tasksArray[i];

        // ternary logic -> condition ? ifTrue : ifFalse
        const doneClass = curTask.done ? 'done' : '';

        // editing this task? show input box, otherwise show text
        const textPart = i === editingIndex
            ? `<input class="edit-input" type="text">`
            : `<span class="task-text" data-action="edit">${curTask.text}</span>`;

        //data-index = which task, data-action = what clicking does
        addedHTML +=
            `<div class="task ${doneClass}" data-index="${i}">
                <span class="checkbox" data-action="toggle">>></span>
                ${textPart}
                <button class="trash-btn" data-action="delete">del</button>
            </div>`;
    };

    list.innerHTML = addedHTML

    // fill edit box w/ current text + put cursor in it
    // set .value in JS (not in HTML) so quotes in task text don't break it
    if (editingIndex !== null) {
        const editInput = list.querySelector('.edit-input');
        editInput.value = tasksArray[editingIndex].text;
        editInput.focus();
    }

    //console.log(tasksArray) // see array in console
    //save to local storage
    localStorage.setItem('savedTasks', JSON.stringify(tasksArray));
}
//

// CLOCK
const clock = document.getElementById('clock');
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { //present time 12:36:14
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const date = now.toLocaleDateString()   //10/29/2026

    const wordedDate = now.toLocaleDateString('en-US', { //October 29, 2026
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    clock.textContent = `${time} ~ ${date} ~ ${wordedDate}`
}
updateClock();
setInterval(updateClock, 1000)
//