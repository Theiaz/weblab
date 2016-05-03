/**
 * Created by Julian on 03.05.2016.
 */
var express = require('express');
var router = express.Router();

/* GET discovery page. */
router.get('/', function(req, res, next) {
    var options = {
        title : 'Geo Location Discovery',
        locations : [ {
            lat : 49.013790,
            long : 8.404435,
            name : 'castle',
            hash : '#sight'
        }, {
            lat : 49.013790,
            long : 8.390071,
            name : 'iwi',
            hash : '#edu'
        } ]
    };
    res.render('discovery', options);
});

module.exports = router;