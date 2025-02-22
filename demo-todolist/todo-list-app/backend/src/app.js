const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const todoRoutes = require('./routes/todoRoutes');
const listEndpoints = require('express-list-endpoints');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use the cors middleware with options

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Log all routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(listEndpoints(app));
});