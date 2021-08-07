const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/Campground.js'),
  Comment = require('./models/Comment.js'),
  User = require('./models/Users.js');

const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Yelp-Camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('view engine', 'ejs');
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/camgrounds/:id/comments', commentRoutes);

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'fortune is smart!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.listen(port, () => {
  debug(`listening on ${chalk.green('PORT')}`);
});