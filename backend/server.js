const express = require('express'); // load server
const app = express(); //create server
const PORT = 3000; //port num

//temp data

let tasks = [
    {id: 1, text: 'study physics', done: false},
    {id: 2, text: 'clean room', done: true}
];

//routes
app.get ('/tasks', (req, res) => {
    res.json(tasks);
});

//start
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})