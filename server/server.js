// DEPENDENCIES
const express = require('express');
const cors = require('cors');

// MONGODB CONNECT IMPORT
const mongoConnect = require('./config/db');
const { errorHandler, errorMiddleware } = require('./middleware/errorMiddleware');

// .ENV CONFIGURATION
require('dotenv').config();

// EXPRESS APP
const app = express();

// <PORT> IN .ENV === NULL => DEFAULT TO 500
const PORT = process.env.PORT || 5000

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.listen(PORT);

mongoConnect();

app.use('/user', require('./routes/userRoutes'));
app.use('/post', require('./routes/postRoutes'));


app.use(errorMiddleware)
