import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isChecked, SetIsChecked] = useState(false);
  const [CompletedTodos, SetCompletedTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");

  function writeTodo(e) {
    setInputVal(e.target.value);
  }
  function addTodo() {
    if (inputVal != "") {
      setTodos((prevTodos) => [...prevTodos, inputVal]);
      setInputVal("");
    }
  }
  function deleteTodo(index) {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo, prevTodoIndex) => {
        return prevTodoIndex != index;
      })
    );
  }

  function deleteTodoFromCompleted(index){
    SetCompletedTodos((prevTodos) =>
      prevTodos.filter((prevTodo, prevTodoIndex) => {
        return prevTodoIndex != index;
      })
    );
  }

  function clickHandler(index) {
    SetIsChecked(!isChecked);
    console.log(isChecked);
    const val = todos.filter((prevTodo, prevTodoIndex) => {
      return prevTodoIndex == index;
    });
    SetCompletedTodos((prevTodos) => [...prevTodos, val]);
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo, prevTodoIndex) => {
        return prevTodoIndex != index;
      })
    );
    console.log(CompletedTodos);
    console.log(todos);
  }

  return (
    <main>
      <h1>Todo List Using React</h1>
      <InputContainer
        inputVal={inputVal}
        addTodo={addTodo}
        writeTodo={writeTodo}
      ></InputContainer>
      <TodoContainer
        todos={todos}
        deleteTodo={deleteTodo}
        clickHandler={clickHandler}
      ></TodoContainer>
      <CompletedTodo
      CompletedTodos={CompletedTodos}
      deleteTodoFromCompleted={deleteTodoFromCompleted}
      >
      </CompletedTodo>
    </main>
  );
}

function InputContainer({ inputVal, addTodo, writeTodo }) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter Todo"
        value={inputVal}
        onChange={writeTodo}
      />
      <button onClick={addTodo}>+</button>
    </div>
  );
}

function TodoContainer({ todos, deleteTodo, clickHandler }) {
  return (
    <div className="container">
      <h1>Todo's :</h1>
      {todos.map((todo, index) => {
        return (
          <Todo
            key={index}
            todo={todo}
            deleteTodo={deleteTodo}
            index={index}
            clickHandler={clickHandler}
          ></Todo>
        );
      })}
    </div>
  );
}

function Todo({ todo, index, deleteTodo, clickHandler }) {
  return (
    <div className="todo">
      <p>{todo}</p>
      <div className="actions">
        <input type="checkbox" onClick={() => clickHandler(index)} />
        <button onClick={() => deleteTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

function CompletedTodo({CompletedTodos,deleteTodoFromCompleted}){
  return(
  <div className="container">
        <h1>Completed Todo's :</h1>
        {CompletedTodos.map((CompletedTodo, index) => {
          return(
            <CompletedTodoSingle CompletedTodo={CompletedTodo} index={index} deleteTodoFromCompleted={deleteTodoFromCompleted}></CompletedTodoSingle>
          )
        })}
      </div>
  )
}


function CompletedTodoSingle({CompletedTodo,index,deleteTodoFromCompleted}){
  return (
    <div className="todo">
      <p>{CompletedTodo}</p>
      <div className="actions">
        <input type="checkbox" checked />
        <button onClick={() => deleteTodoFromCompleted(index)}>Delete</button>
      </div>
    </div>
  );
}


export default App;
