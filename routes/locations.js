var express = require('express');
var router = express.Router();
var get_object_id = require('../helper');

var Location = require('../models/location');

router.get('/', function(req, res, next) {
  Location.find({}, function(err, locations) {
    console.log(locations);
    res.render('location/locations', { title: 'Locations', locations: locations});
  });
});

router.get('/new', function(req, res, next) {
  res.render('location/location_form', { title: "new location"} );
});

router.post('/new', function(req, res, next) {
  var location = new Location({
            name: req.body.name
            });
  location.save(function(err) {
    if (err) throw err;
    console.log('new location saved successfully');
    res.redirect('/locations')
  });
});

router.get('/edit/:id', function(req, res, next) {
  Location.findById(get_object_id(req.params.id), function(err, location) {
    if(err) {
      console.log("was not able to find a location for id %s with: ", object_id, err)
    }
    res.render('location/location_edit', { title: "Edit location", location: location });
  });
});

router.post('/update/:id', function(req, res,next) {
  Location.findById(get_object_id(req.params.id), function(err, location) {
    location.name = req.body.name;
    location.save(function(err, location) {
      if (err) {
        res.send('unable to save location');
      }
      else {
        res.redirect('/locations');
      };
    });
  });
});

module.exports = router;
