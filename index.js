const express = require('express');
const morgan = require('morgan');
const config = require('config');
const app_main= require('debug')('app:main')
const app_db= require('debug')('app:db')
const student_router=require('./routers/students')
const port = process.env.PORT || 3000;
const app = express();
app_main('Application Name :',config.get('app_name'))
app_main('Application Mode :',config.get('app_mode'))
app_db('Application DB url :',config.get('db.url'))
app_db('Application DB password :',config.get('db.password'))

app.use(express.json());
if(app.get('env')==='development')
    app.use(morgan('dev'));

app.use('/api/students',student_router);

app.listen(port,()=> app_main(`Server running on ${port}...`));
