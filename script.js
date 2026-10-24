const inputText = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clear = document.querySelector('.clear')

inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputText.value !== '') {

        const newTask = document.createElement('li'); // create new element
        newTask.textContent = inputText.value; //instantiate inputval to new element, newTask
        list.appendChild(newTask); //append to the list element
        
        inputText.value = '' // reset bar after enter
        
    }
})

clear.addEventListener('click', () => { 
    list.innerHTML = '' 
})