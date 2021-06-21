const express = require('express');

const app = express();
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('landing');
});

const campgrounds = [
  { name: 'Salmon Creek', image: 'https://pixabay.com/get/g6e7a94b97cc33effc97cdc6491ad59056517ac1387849e1e10af4964eeb95a21392d10cf4fb5b2d49aa9d0d6de41f485_340.jpg' },
  { name: 'Granite Hill', image: 'https://pixabay.com/get/g87ca6212c33947218e67c5038b3f6dab45e741465adf73a916ffcd73e6326d0769424698325c2d0036c459dd1e1fc0a7_340.jpg' },
  { name: "mountain Goat's Rest", image: 'https://pixabay.com/get/g14630639939a10f5957a8d0f948d7e96301caa32a7fab5631461df9e07166e74ffaed5c0d7be4139c51311e9e4ae7b47_340.jpg' },
  { name: 'Salmon Creek', image: 'https://pixabay.com/get/g1ebd09240c9a2205a6852f2f2dab08b7ac01b8af4aa0dd01399dc8f244f33ab67fb828ef9e88479dad1a4904195b01e4_340.jpg' },
  { name: 'Granite Hill', image: 'https://pixabay.com/get/g662fc035b622633f223b0adbe9d53668e9f706fc20dfba01a6b54b4c6d750f8692505dc0bc12a94cd87cfb669c203ffd_340.jpg' },
  { name: "mountain Goat's Rest", image: 'https://pixabay.com/get/g17f35f288f03f0caef76482335e405e6e2d89a813486bbd0155ca2284427720609b01121d906fccdbaf626bc6b1e182c_340.jpg' },

];

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds });
});

app.post('/campgrounds', (req, res) => {
  const { name } = req.body;
  const { image } = req.body;
  const NewCampgrounds = {
    name,
    image
  };
  campgrounds.push('newCampgrounds');
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(port, () => {
  debug(`listening on ${chalk.green('PORT')}`);
});
