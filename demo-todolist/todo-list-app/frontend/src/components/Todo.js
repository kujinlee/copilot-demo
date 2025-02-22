import React from 'react';

const Todo = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default Todo;