require('dotenv').config();
require('./models/connection');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')
const gendersRouter  = require('./routes/genders')
const booksRouter  = require('./routes/books')


var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.use('/genders', gendersRouter)
app.use('/books', booksRouter)

module.exports = app;
