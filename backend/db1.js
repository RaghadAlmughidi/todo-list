const mongoose=require('mongoose')

const dbURI='mongodb://localhost:27017/TodoListV01';

mongoose.connect(dbURI)


//EXTRA
const db=mongoose.connection

db.on('error',(err)=>{
  console.log("ERROR in MongooseDB");
});

db.on('connected',(err)=>{
  console.log("CONNETED MongooseDB");
});