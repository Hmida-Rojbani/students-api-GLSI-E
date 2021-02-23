const express = require('express');
const Joi = require('joi');
const auth = require('./auth');
const autoris = require('./autoris')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(function(req,res,next){
    console.log("Logging");
    next();
})


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

const validation_schema = {
    name : Joi.string().min(3).max(50).required()
}

app.use(auth)
app.post('/api/students', (req,res)=> {
    //if(!req.body.name || req.body.name.length < 3)
    //   return res.status(400).send('Name is not found or length < 3')
    let valid_res = Joi.validate(req.body,validation_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let student = {
        id: students.length + 1,
        name : req.body.name
    };
    students.push(student);
    res.send(student);
});

const validation_id_schema = {
    id : Joi.number().min(1)
}
app.put('/api/students/:id',(req,res) => {
    let valid_res = Joi.validate(req.params,validation_id_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student) 
        return res.status(404).send(`Student with id : ${req.params.id} is not found`);
    valid_res = Joi.validate(req.body,validation_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    student.name = req.body.name
    res.send(student);
});

app.delete('/api/students/:id',autoris,(req,res) => {
    let valid_res = Joi.validate(req.params,validation_id_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student) 
        return res.status(404).send(`Student with id : ${req.params.id} is not found`);
    students = students.filter(s => s.id !== parseInt(req.params.id))
    res.send(student);
});

app.listen(port,()=> console.log(`Server running on ${port}...`));
