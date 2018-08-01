require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const cors         = require('cors');

const passport     = require('passport');
const session      = require('express-session');
const passportSetup = require('./config/passport');

const app = express();

// SETTING UP MONGOOSE CONNECTINO TO MONGODB
mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/server', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// SETTING UP DEBUG
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
// SETTING UP PATH
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// SETTING UP SESSION
app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));

// INITIALIZING PASSPORT AND SESSION
app.use(passport.initialize());
app.use(passport.session());

passportSetup(passport);

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// SETTING UP CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

const index = require('./routes/index');
app.use('/', index);

// USER AUTHENTICATION + CRUD ROUTES
const usersRoutes = require('./routes/usersRoutes');
app.use('/api/users', usersRoutes);

// ORGANIZATION CRUD ROUTES
const organizationsRoutes = require('./routes/organizationsRoutes');
app.use('/api/orgs', organizationsRoutes);

//EVENT CRUD ROUTES
const eventsRoutes = require('./routes/eventsRoutes');
app.use('/api/events', eventsRoutes)

// REVIEW CRUD ROUTES
const reviewsRoutes = require('./routes/reviewsRoutes');
app.use('/api/reviews', reviewsRoutes);

module.exports = app;
