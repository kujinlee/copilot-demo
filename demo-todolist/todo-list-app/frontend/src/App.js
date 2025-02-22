import React, { useState, useEffect, useCallback } from 'react';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = { title, description, completed: false };
    await fetch(`${backendUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    setTitle('');
    setDescription('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${backendUrl}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    await fetch(`${backendUrl}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
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
          <Todo key={todo._id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
        ))}
      </div>
    </div>
  );
};

export default App;