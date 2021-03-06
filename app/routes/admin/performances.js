var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Performance = require('../../models/performance');
var Festival = require('../../models/festival');
var Location = require('../../models/location');
var Band = require('../../models/band');
var moment = require('moment');
var moment_timezone = require('moment-timezone');

router.get('/', function(req, res, next) {
  Performance.find({})
    .populate('festival')
    .populate('location')
    .populate('band')
    .exec(function (err, docs) {
      if (err) {
        res.send('can not fetch performances');
      }
    res.render('performance/performances', { title: 'Performances', performances: docs});
  });
});

/* GET form performance */
router.get('/new', function(req, res, next) {
  Festival.find({}, function(festivalError, festivals) {
    Location.find({}, function(locationError, locations) {
      Band.find({}, function(bandError, bands) {
        res.render('performance/performance_form',
                   { title: "New performance",
                     festivals: festivals,
                     locations: locations,
                     bands    : bands});
      });
    });
  });
});

router.post('/new', function(req, res, next) {

  var from = new Date(req.body.from);
  var utc_from = date.toUTCString();

  var to = new Date(req.body.to);
  var utc_to = to.toUTCString();

  var performance = new Performance({


    name:        req.body.name,
    desctiption: req.body.description,
    from:        from,
    to:          to,
    featuring:   req.body.featuring,
    festival:    req.body.festival_id,
    location:    req.body.location_id,
    band:        req.body.band_id,
    description: req.body.description
  });
  performance.save(function(err) {
    if (err) throw err;
    console.log('new performance saved successfully');
    res.redirect('/admin/performances')
  });
});

router.get('/edit/:id', function(req, res, next) {
  Band.find({}, function(bandError, bands){
    Location.find({}, function(locationError, locations) {
      Festival.find({}, function(festivalError, festivals) {
        Performance.findById(get_object_id(req.params.id))
          .populate('festival')
          .populate('location')
          .populate('band')
          .exec(function(err, performance) {
          if(err) {
            console.log("was not able to find a performance for id %s with: ", object_id, err)
          }

          res.render('performance/performance_edit',
						 { title: "Edit performance",
							 performance: performance,
							 festivals: festivals,
							 locations: locations,
							 bands: bands
						 });
        });
      });
    });
  });
});

router.post('/update/:id', function(req, res,next) {

  Performance.findById(get_object_id(req.params.id), function(err, performance) {

    console.log('from mongo: ', performance.from);

    console.log('from UI', req.body.from);

    var from = new Date(req.body.from);
    console.log('new date: ', date);

    var utc_from = date.toUTCString();
    console.log('new date UTC: ', utc_date);

    var to = new Date(req.body.to);
    var utc_to = to.toUTCString();

    performance.name        = req.body.name;
    performance.description = req.body.description;
<<<<<<< HEAD:app/routes/admin/performances.js
    performance.from        = utc_date;
    performance.to          = req.body.to;
=======
    performance.from        = moment(req.body.from).tz('Europe/Berlin').format();
    performance.to          = moment(req.body.to).tz('Europe/Berlin').format();
>>>>>>> b0c4a6d22ea9183050dd7b85bfc1f5c17ceba885:routes/admin/performances.js
    performance.featuring   = req.body.featuring;
    performance.festival    = req.body.festival_id;
    performance.location    = req.body.location_id;
    performance.band        = req.body.band_id;
    performance.description = req.body.description;
    performance.save(function(err, performance) {
      if (err) {
        res.send('unable to save performance');
      }
      else {
      // console.log("stored performance: ", performance);
      // console.log("performance req", req.body);
<<<<<<< HEAD:app/routes/admin/performances.js

=======
>>>>>>> b0c4a6d22ea9183050dd7b85bfc1f5c17ceba885:routes/admin/performances.js
        res.redirect('/admin/performances');
      };
    });
  });
});


module.exports = router;
