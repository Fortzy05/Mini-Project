var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("landing");

});

app.get("/campgrounds", function (req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://pixabay.com/get/g9d4ea7db0953a3fdb7cf3c0c45a4fcfb18b38b0f0c6662881dd1abebdeb81ceee09c7a3b368b792d6a8f148c27634fff_340.jpg" },
        { name: "Granite Hill", image: "https://pixabay.com/get/g1652a42c6adbacbebd9def38dd9fda9e13214f8c82f72f8718dd3078c5ea4936f838251087be4311e50583453e019ebb_340.jpg" },
        { name: "mountain Goat's Rest", image: "https://pixabay.com/get/g0118ae07ac0484d6ececac8557b908541615be56e86b611be86db83d252138a3ef36178e0efef5a969c131666abfeb06_340.jpg" }

    ]
    res.render("campgrounds", { campgrounds: campgrounds });
});
app.listen(3000, function () {
    console.log("The YelpCamp Sever Has Started");
});