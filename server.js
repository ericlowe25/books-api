// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//BOOKS CONTROLLER
const booksController = require('./controllers/books-controller');
app.use('/books', booksController);

//CORS
app.get('/books/:id', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the Hello World! API');
})

// LISTEN
app.listen(PORT, () => {
  console.log('Greetings! From port: ', PORT);
})
//CORS LISTEN
app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80')
})