// ========================
// Modules
// ========================
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./api/v1/config/database');
const mainRoute = require('./api/v1/routes/index');
const authRoute = require('./api/v1/routes/auth');
const path = require('path');

// ========================
// Configs
// ========================
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const PORT = process.env.PORT || 1111;
const NODE_ENV = process.env.NODE_ENV;

// ========================
// Authentication
// ========================
require('./api/v1/config/passport')(passport);

// ========================
// Database
// ========================
connectDB();

// ========================
// Initialize app
// ========================
const app = express();
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ========================
// Middlewares
// ========================
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './api/v1/views'));
app.use(express.static(path.join(__dirname, './api/v1/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
}))
app.use(passport.initialize())
app.use(passport.session())

// ========================
// Routes
// ========================
app.use('/', mainRoute)
app.use('/auth', authRoute)

// ========================
// Listen to Port
// ========================
app.listen(PORT, () => console.log(`Server running in ${NODE_ENV} mode on ${PORT}`))