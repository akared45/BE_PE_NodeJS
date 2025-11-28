require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB_NAME;
    const uri = `${mongoUrl}/${dbName}`;
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { mongoose, connect };
