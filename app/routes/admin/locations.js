var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Location = require('../../models/location');

router.get('/', function(req, res, next) {
  Location.find({}, function(err, locations) {
    console.log(locations);
    res.render('location/locations', { title: 'Locations', locations: locations});
  });
});

router.get('/new', function(req, res, next) {
  res.render('location/location_form', { title: "New location"} );
});

router.post('/new', function(req, res, next) {
  var location = new Location({
            name: req.body.name,
            city: req.body.city,
            street: req.body.street,
            zip: req.body.zip,
            phone: req.body.phone,
            fax: req.body.fax,
            web: req.body.web,
            email: req.body.email,
            imageUrl: req.body.imageUrl
            });
  location.save(function(err) {
    if (err) throw err;
    console.log('new location saved successfully');
    res.redirect('/admin/locations')
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
    location.city = req.body.city;
    location.steet = req.body.street;
    location.zip = req.body.zip
    location.phone = req.body.phone;
    location.fax = req.body.fax;
    location.web = req.body.web;
    location.email = req.body.email;
    location.imageUrl = req.body.imageUrl;
    location.save(function(err, location) {
      if (err) {
        res.send('unable to save location');
      }
      else {
        res.redirect('/admin/locations');
      };
    });
  });
});

module.exports = router;
