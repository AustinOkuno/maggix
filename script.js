// global variables
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.getElementById('clear-btn');

let arr1 = [];


//input text
input.addEventListener('keydown', (event) => {
    if ( event.key === 'Enter' ) {
        addEvent()
    }
})

// add event logic
clear.addEventListener("click", () => {
    input.value = ''
    arr1 = []
    list.innerHTML = ''
})

function addEvent() {
    arr1.push(input.value.trim());
    input.value = '';
    renderList()
}
// 

//delete logic below 
list.addEventListener('click', (event) => {
    console.log('delete')
    deleteEvent(event.target.dataset.index);
})
function deleteEvent(index) {
    arr1.splice(index, 1);
    renderList();
}
// 

function renderList() {
    let addedHTML = '';
    for (let i = 0; i < arr1.length; i ++) {
        let curTask = arr1[i];
        addedHTML += `<p data-index="${i}"> >> ${curTask}</p>`;
    };
    
    list.innerHTML = addedHTML
}

