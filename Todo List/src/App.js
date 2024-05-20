import "./index.css";
import { useState } from "react";

export default function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    if (todo.trim() === "") return; // Prevent adding empty todos

    const newTodo = {
      id: Math.random(),
      todo: todo,
    };
    // Add to todo list
    setList([...list, newTodo]);
    // Clear input box
    setInput("");
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const moveUp = (index) => {
    if (index === 0) return; // Can't move the first item up
    const newList = [...list];
    const temp = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = temp;
    setList(newList);
  };

  const moveDown = (index) => {
    if (index === list.length - 1) return; // Can't move the last item down
    const newList = [...list];
    const temp = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = temp;
    setList(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo(input);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => addTodo(input)}>Add</button>
      <ul>
        {list.map((todo, index) => (
          <li key={todo.id}>
            {todo.todo}
            <button onClick={() => moveUp(index)}>↑</button>
            <button onClick={() => moveDown(index)}>↓</button>
            <button onClick={() => deleteTodo(todo.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
