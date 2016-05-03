/**
 * Created by Julian on 03.05.2016.
 */
var express = require('express');
var router = express.Router();

function tagging(req, res) {
    console.log("GET tagging in tagging.js")
    var options = {
        title: 'Geo Location Tagging',
        name: 'Location Name: ',
        hash: "Hashtag: "
    };
    res.render('tagging', options);
}

//GET users list page
router.get('/', tagging);

//POST user message page
router.post('/', function(req, res, next) {
    console.log("POST tagging in tagging.js")
    var options = {
        title: 'Geo Location Tagging',
        name: 'Location Name: ',
        hash: "Hashtag: "
    };
    res.render('tagging', options);
});


module.exports = router;
