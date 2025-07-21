const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/jobs', jobRoutes);
app.use('/api/auth' , authRoutes)
app.use('/api/user' , userRoutes)
app.use('/api/admin', adminRoutes);


app.use(errorHandler);

module.exports = app


