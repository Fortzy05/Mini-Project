const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Yelp-Camp', { useNewUrlParser: true, useUnifiedTopology: true });

const campgroundSchema = new mongoose.Schema({
  name: 'string',
  image: 'string'
});

const Campground = mongoose.model('Campground', campgroundSchema);

//Campground.create(
// {
//   name: 'Granite Hill',
//   image: 'https://cdn.pixabay.com/photo/2021/05/23/17/52/bellies-6276856__340.jpg'
// }, function (err, Campground) {
//   if (err) {
//    console.log(err);
// } else {
// console.log('Newly Created Campground: ');
//  console.log(Campground);
// }
// });
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');
const { stringify } = require('querystring');
const { createPrivateKey } = require('crypto');

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, function (err, allCampground) {
    if (err) {
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
    name: name, image: image
  };
  Campground.create(NewCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });

});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(port, () => {
  debug(`listening on ${chalk.green('PORT')}`);
});
