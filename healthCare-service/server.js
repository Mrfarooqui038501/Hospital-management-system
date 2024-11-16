const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const serviceRoutes = require('./routes/serviceRoutes');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Database connection
connectDB();

// Routes
app.use('/api/services', serviceRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});