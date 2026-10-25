// global variables
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.getElementById('clear-btn');

let tasksArray = JSON.parse(localStorage.getItem('savedTasks')) ?? [];

renderList()

//input text / add event logic 
input.addEventListener('keydown', (event) => {
    if ( event.key === 'Enter') {
        addTask()
    }
})
function addTask() {
    let text = input.value.trim();
    if (text.length !== 0) {
        tasksArray.push(text);    
    }
    input.value = '';
    renderList()
}
// 

//delete logic below 
list.addEventListener('click', (event) => {
    console.log('delete')
    deleteTask(event.target.dataset.index);
})
function deleteTask(index) {
    tasksArray.splice(index, 1);
    renderList();
}
// 
// clear button 
clear.addEventListener("click", () => {
    input.value = ''
    tasksArray = []
    list.innerHTML = ''
    renderList();
})
//
function renderList() {
    let addedHTML = '';
    for (let i = 0; i < tasksArray.length; i ++) {
        let curTask = tasksArray[i];
        addedHTML += `<p data-index="${i}"> >> ${curTask}</p>`;
    };
    list.innerHTML = addedHTML

    //save to local storage
    localStorage.setItem('savedTasks', JSON.stringify(tasksArray));
}

