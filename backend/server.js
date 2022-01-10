const express= require('express')
const app=express()

const db1=require("./db1");

const Todo=require('./todo')
console.log(Todo);
app.use(express.json())

app.get("/",(req,res)=>{
    res.json('GET / WORKING')
})
//get all tasks data
app.get("/tasks",(req,res)=>{
   Todo.find({},(err,data)=>{
     if(err) {
         console.log('Error: ',err)
     } else{
         res.json(data);
     }
   }) 
})
//post new task
app.post("/tasks", (req, res) => {
     console.log('25:',req.body);
  
    Todo.create(req.body, (err, newTask) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res.status(201).json(newTask);
      }
    });
  });
//delete One task by:id 
  app.delete("/tasks/:id", (req, res) => {
    //console.log('35:',req.params.id);
 
   Todo.deleteOne({_id: req.params.id}, (err, deleteObj) => {
     if (err) {
       console.log("ERROR: ", err);
     } else {
       deleteObj.deletedCount ===1?res.json("delete successfully"):res.status(404).json("not found");
       console.log(deleteObj);
       
     }
   });
 });
//Update One task title
app.put("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ?res.json("Update one todo successfully")
          :res.status(404).json("This todo is not found");
      }
    }
  );
});
//get comleted data &not completed
//http://localhost:5000/fillter?isCompleted=true   it called query params 
//?key=value&key=value 
app.get("/fillter",(req,res)=>{
  console.log(req.query);
  Todo.find({isCompleted: req.query.isCompleted},(err,data)=>{
    if(err){console.log("ERROR",err);
  }else{
    res.json(data);
  }
  });
});
//delete completed tasks
app.delete("/tasks", (req, res) => {

 Todo.deleteMany({isCompleted: true}, (err, deleteObj) => {
   if (err) {
     console.log("ERROR: ", err);
   } else {
     console.log(deleteObj);
     deleteObj.deletedCount ===0?
     res.status(404).json("there ara no tasks found")
     :res.json("delete all completed tasks successfully");
     
   }
 });
});
// update One task case
app.put("/tasks/:id/:isCompleted", (req, res) => {
   console.log("97:", req.params);
  Todo.updateOne(
    { _id: req.params.id },
    { isCompleted: req.params.isCompleted},
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ?res.json("Update one todo successfully")
          :res.status(404).json("This todo is not found");
      }
    }
  );
});
app.listen(3000,()=>{
    console.log('SERVER WORKING')
})
