import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = { title, description, completed: false };
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    setTitle('');
    setDescription('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo Description"
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default App;