import React,{useState,useEffect} from 'react';
import "./App.css";
import axios from "axios"
import Todo from "./components/Todo";
function App() {
  const [tasks, setTasks]= useState([]);
  //bring task each refrish so dont need GET DATA button
  useEffect(() => {
   getData()
  }, [])
  const getData=()=>{
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
  const mapOverTasks = tasks.map((taskObj, i)=>
   //map method every time return Todo
   <Todo key={i} task={taskObj}/>
  );
  return (
    <div className="App">
     <p>App</p>
     {/*button to GET data*/}
      <button onClick={getData}>Get task</button>
      {mapOverTasks}
    </div>
  );
}

export default App;
