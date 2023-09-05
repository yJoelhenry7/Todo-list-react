import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState(" ");

  function writeTodo (e){
    setInputVal(e.target.value);
  }
  function addTodo(){
    if(inputVal != ""){
      setTodos((prevTodos) => [...prevTodos,inputVal]);
      setInputVal("");
    }
    console.log(inputVal);
  }
  function deleteTodo(index){
    setTodos(prevTodos => prevTodos.filter((prevTodo,prevTodoIndex)=>{
       return prevTodoIndex != index;
    }))
  }

  return (
    <main>
      <h1>Todo List Using React</h1>
      <InputContainer inputVal={inputVal} addTodo={addTodo} writeTodo={writeTodo}></InputContainer>
      <TodoContainer todos={todos} deleteTodo={deleteTodo}></TodoContainer>
    </main>
  );
}

function InputContainer({inputVal,addTodo,writeTodo}){
  return(
<div className="input-container">
        <input type="text" 
        placeholder="Enter Todo" 
        value={inputVal}
        onChange={writeTodo}
        />
        <button onClick={addTodo}>+</button>
      </div>
  );
}

function TodoContainer({todos,deleteTodo}){
  return(
    <div className="container">
    {
    todos.map((todo,index)=>{
      return (
        <Todo key={index} todo={todo} deleteTodo={deleteTodo} index={index}></Todo>
      )
    })
    }
  </div>
  )
}

function Todo({todo,index,deleteTodo}){
  return(
  <div className="todo" >
        <p>{todo}</p>
        <div className="actions">
          <input type="checkbox" />
          <button onClick={()=> deleteTodo(index)} >Delete</button>
        </div>
      </div>
  )
}

export default App;
