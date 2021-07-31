var mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    name: 'string',
    image: 'string'
});

//const Campground = mongoose.model('Campground', campgroundSchema);

//Campground.create
// {
//  name: 'Maple Spring',
// image: 'https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg?maxwidth=1200&maxheight=1200&autorotate=false'
// eslint-disable-next-line no-shadow
// }, (err, Campground) => {
// if (err) {
// console.log(err);
// } else {
// console.log('Newly Created Campground: ');
// console.log(Campground);
//}
//}
//);
module.exports = mongoose.model('Campground', campgroundSchema);