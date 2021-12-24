const express= require('express')
const app=express()

const db=require('./db1')
const Todo=require('./todo')
console.log(Todo);

app.get('/',(req,res)=>{
    res.json('GET / WORKING')
})
app.get('/tasks',(req,res)=>{
    res.json('working')
})

app.listen(5000,()=>{
    console.log('SERVER WORKING')
})
