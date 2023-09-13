const todoContainer = document.querySelector('#todo-container')
const addTodoForm = document.querySelector('#add-todo-form')
const newTodoTask = document.querySelector('#new-todo-task')

// fetch all todos from the server and render them
fetch('http://localhost:3000/')
.then(response => response.json())
.then(data => {
    data.response.forEach(todo => {
        renderTodo(todo)
    })
})

// add a new todo
addTodoForm.addEventListener('submit', e => {
    e.preventDefault()
    const task = newTodoTask.value
    if (!task) return
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
    })
    .then(response => response.json())
    .then(data => {
        renderTodo({ id: data.response.insertId, task: task })
        newTodoTask.value = ''
    })
    .catch(err => console.log(err))
})

// render a todo item
function renderTodo(todo) {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.innerHTML = `
        <p>${todo.task}</p>
        <button data-id=${todo.id}>Delete</button>
    `
    todoContainer.appendChild(todoItem)

    // delete a todo
    todoItem.querySelector('button').addEventListener('click', e => {
        fetch(`http://localhost:3000/${todo.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            todoItem.remove()
        })
        .catch(err => console.log(err))
    })
}
