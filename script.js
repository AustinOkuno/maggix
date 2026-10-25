const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.getElementById('clear-btn');

let arr1 = [];

input.addEventListener('keydown', (event) => {
    if ( event.key === 'Enter' ) {
        addEvent()
    }
})

function addEvent() {
    arr1.push(input.value.trim());
    input.value = '';
    renderList()
}

function renderList() {
    addedHTML = '';
    for (let i = 0; i < arr1.length; i ++) {
        let curTask = arr1[i];
        addedHTML += `<p> >> ${curTask}<p>`;
    };
    list.innerHTML = addedHTML
}

clear.addEventListener("click", () => {
    input.value = ''
    arr1 = []
    list.innerHTML = ''
})