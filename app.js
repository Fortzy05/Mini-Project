const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/Campground.js'),
  Comment = require('./models/Comment.js'),
  User = require('./models/Users.js');


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


//PASSPORT CONFIGURATION
app.use(require('express-sessions')({
  secret: 'fortune is smart!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampground) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampground });
    }
  });
});

app.post('/campgrounds', (req, res) => {
  const { name } = req.body.name;
  const { image } = req.body.image;
  const NewCampground = {
    name, image
  };

  Campground.create(NewCampground, (err, newlyCreated) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

//=====================
// AUTH ROUTES
//=====================

//SHOW REGISTER FORM
app.get('/register', (req, res) => {
  res.render('register');
});

// handle sign up logic

app.post('/register', (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/campgrounds');
    });
  });
});

app.listen(port, () => {
  debug(`listening on ${chalk.green('PORT')}`);
});