const express = require('express')
const mysql = require('mysql2')

// create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo_db'
})

// connect to database
db.connect(err => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})

const app = express()
app.use(express.json())

// get all todo items
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM todos'
    let query = db.query(sql, (err, results) => {
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })
})

// get a single todo item
app.get('/:id', (req, res) => {
    let sql = `SELECT * FROM todos WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}))
    })
})

// add a new todo item
app.post('/', (req, res) => {
    let data = {task: req.body.task}
    let sql = 'INSERT INTO todos SET ?'
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": "Todo added successfully!"}))
    })
})

// update a todo item
app.put('/:id', (req, res) => {
    let newTask = req.body.task
    let sql = `UPDATE todos SET task = '${newTask}' WHERE id = ${req.params.id}`
    letquery = db.query(sql, (err, result) => {
if (err) throw err
res.send(JSON.stringify({"status": 200, "error": null, "response": "Todo updated successfully!"}))
})
})

// delete a todo item
app.delete('/:id', (req, res) => {
let sql = `DELETE FROM todos WHERE id = ${req.params.id}`
let query = db.query(sql, (err, result) => {
if (err) throw err
res.send(JSON.stringify({"status": 200, "error": null, "response": "Todo deleted successfully!"}))
})
})

// server listening on port 3000
app.listen(3000, () => {
console.log('Server started on port 3000')
})
