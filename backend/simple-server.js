require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://gowrishankerbhonagiri_db_user:fZku5Sm079QMqW7K@cluster0.ilva0hz.mongodb.net/smartcitydb?retryWrites=true&w=majority";
const PORT = 5000;

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();