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
  //get all Tasks
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
  //post new Tasks
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
  //delete Tasks
  const deleteTodo =(id)=>{
    
    axios
    .delete(`http://localhost:5000/tasks/${id}`)
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
  //update tasks
  const toggleTodo =(id,newStatus)=>{
    //axios =>>bring data from data base
    axios
    .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
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
   
   <Todo key={i} task={taskObj} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
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
