var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var options = {
		title : 'Geo Location App'
	};
	res.render('index', options);
});

module.exports = router;