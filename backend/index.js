// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv') ;
dotenv.config()
const connectToDb = require('./config/db')
const colors = require('colors')
app.use(express.json())

//Middlewares
const {notFound, errorHandler} = require('./middleware/errorMiddleware')



// Connection to databse 
connectToDb()

// Importing routers
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

// Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Dotenv
require('dotenv').config();

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)


// Error handeleing middleware 
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, (err) => {
  if (err) return err;
  console.log(`Server is successfully started on port ${process.env.PORT}`.yellow.bold);
});
