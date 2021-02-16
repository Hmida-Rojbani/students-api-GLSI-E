const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

var students = [
    {id : 1, name : "student 1"},
    {id : 2, name : "student 2"},
    {id : 3, name : "student 3"}
]

app.get('/api/students',(req,res) => {
    res.send(students);
});

app.get('/api/students/:id',(req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student) 
        return res.status(404).send(`Student with id : ${req.params.id} is not found`);
    res.send(student);
});

app.listen(port,()=> console.log(`Server running on ${port}...`));
