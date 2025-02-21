# File: /todo-list-app/todo-list-app/backend/README.md

# Todo List Application - Backend

This is the backend part of the Todo List application built with Node.js and Express. It provides a RESTful API for managing todo items.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd todo-list-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your environment variables (if needed).

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

- `GET /todos` - Retrieve all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo by ID
- `DELETE /todos/:id` - Delete a todo by ID

## Technologies Used

- Node.js
- Express
- Mongoose
- MongoDB (for data storage)