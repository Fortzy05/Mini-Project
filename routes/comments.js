var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/Campground');
var Comment = require('../models/Comment');



//==========================
//COMMENTS ROUTES
//===========================
router.get('/new', isLoggedIn, (req, res) => {
    //find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

router.post('/', isLoggedIn, (req, res) => {
    //look up campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/' + campground._id);
                }
            });
        }
    });
})
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.export = router;