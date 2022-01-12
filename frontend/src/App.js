import React,{useState,useEffect} from 'react';
import "./App.css";
import axios from "axios"
import Todo from "./components/Todo";
import Add from "./components/Add";
function App() {
  const [tasks, setTasks]= useState([]);
  //bring task each refrish so dont need GET DATA button
  useEffect(() => {
   getData()
  }, []);
  const getData= () =>{
    {/*from backend getTasks using axios */}
    axios
      .get('http://localhost:5000/tasks')
      .then((response)=>{
        console.log('data',response.data);
        setTasks(response.data);
      })
      .catch((err)=>{
        console.log('error',err);
      });
  };
  const postNewTodo =(body)=>{
    
    axios
    .post('http://localhost:5000/tasks',body)
    .then((response)=>{
      console.log('data',response.data);
     // setTasks(response.data);
     // getData() to see the new task
     getData()
    })
    .catch((err)=>{
      console.log('error',err);
    }); 
  };
  const mapOverTasks = tasks.map((taskObj, i)=>
   //map method every time return Todo
   <Todo key={i} task={taskObj}/>
  );
  return (
    <div className="App">
     <p>App</p>
     <Add createFunc={postNewTodo} />
     {/*button to GET data*/}
      <button onClick={getData}>Get task</button>
      {mapOverTasks}
    </div>
  );
}

export default App;
