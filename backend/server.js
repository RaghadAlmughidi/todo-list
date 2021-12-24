const express= require('express')
const app=express()

const db=require('./db1')
const Todo=require('./todo')
console.log(Todo);
app.use(express.json())

app.get("/",(req,res)=>{
    res.json('GET / WORKING')
})
app.get("/tasks",(req,res)=>{
   Todo.find({},(err,data)=>{
     if(err) {
         console.log('Error: ',err)
     } else{
         res.json(data);
     }
   }) 
})
app.post("/tasks",(req,res)=>{
    console.log(req.body);

    Todo.create(req.body,(err,newtask)=>{
       if(err){
           console.log("ERROR: ",err);
       }else{
          res.status(201).json(newtask);
       }
    });

});

app.listen(5000,()=>{
    console.log('SERVER WORKING')
})
