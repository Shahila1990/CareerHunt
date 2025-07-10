const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/jobs', jobRoutes);
app.use('/api/auth' , authRoutes)
app.use('/api/user' , userRoutes)

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
