const mongoose=require("mongoose")

const dbURI='mongodb://localhost:27017/TodoListV01';

mongoose.connect(dbURI);


//EXTRA
const db1=mongoose.connection;

db1.on("error",(err)=>{
  console.log('ERROR in MoongooseDB..');  
});

db1.on("Connection",(err)=>{
    console.log('MoongooseDB CONNECTED..');  
  })