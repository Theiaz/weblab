var express = require('express');
var router = express.Router();

var geolocate = require('node-geolocate');


/* GET home page. */
router.get('/', function(req, res, next) {
	var options = {
		title : 'Geo Location App'
	};
	res.render('index', options);
});
/* GET tagging page. */
router.get('/tagging', function(req, res, next) {
	var options = {
		title: 'Geo Location Tagging',
		name: 'Location Name: ',
		hash: "Hashtag: "
	};
	res.render('tagging', options);

	if (geolocate)
	{
		var latitude = latLong[0];
		var longitude = latLong[1];
		console.log(latitude)
	}
});
/* GET discovery page. */
router.get('/discovery', function(req, res, next) {
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