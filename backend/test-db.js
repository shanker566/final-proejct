const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = "mongodb+srv://gowrishankerbhonagiri_db_user:fZku5Sm079QMqW7K@cluster0.ilva0hz.mongodb.net/smartcitydb?retryWrites=true&w=majority";

console.log('Testing MongoDB connection...');
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('Connection state:', mongoose.connection.readyState);
  process.exit(0);
})
.catch(e => {
  console.error('❌ MongoDB connection error:', e);
  console.error('Details:', {
    code: e.code,
    codeName: e.codeName,
    name: e.name
  });
  process.exit(1);
});