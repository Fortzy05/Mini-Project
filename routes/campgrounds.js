var express = require('express');
var router = express.Router();
var Campground = require('../models/Campground');

router.get('/', (req, res) => {
    Campground.find({}, (err, allCampground) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampground });
        }
    });
});
router.post('/', (req, res) => {
    const { name } = req.body.name;
    const { image } = req.body.image;
    const desc = req.body.description;
    const NewCampground = {
        name: name, image: image, description: desc
    };

    Campground.create(NewCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', (req, res) => {
    res.render('new');

    router.get('/:id', (req, res) => {
        campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
            if (err) {
                console.log(err);
            } else {
                console.log(foundCampground)
                res.render('campgrounds/show', { campground: foundCampground });
            }
        });
    });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;