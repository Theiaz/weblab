/**
 * Created by Julian on 03.05.2016.
 */
var express = require('express');
var router = express.Router();

var options = {
    title: 'Geo Location Tagging',
    name: 'Location Name: ',
    hash: "Hashtag: ",
    latitude: "Latitude: ",
    longitude: "Longitude: "
};

function renderTagging(req, res) {
    console.log("GET tagging in tagging.js")
    res.render('tagging', options);
}

//GET tagging
router.get('/', renderTagging);

//POST user message page
router.post('/', function(req, res, next) {
    console.log("POST tagging in tagging.js")
    res.render('tagging', options);
});


module.exports = router;
