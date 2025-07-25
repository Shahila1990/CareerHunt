const express = require('express');
const app = require('./app'); 
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server is running on port: ${port}`);
  }
});
