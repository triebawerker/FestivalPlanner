var express = require('express');
var router = express.Router();
var get_object_id = require('../helper');

var Performance = require('../models/performance');
var Festival = require('../models/festival');
var Location = require('../models/location');
var Band = require('../models/band');

router.get('/', function(req, res, next) {
  Performance.find({})
    .populate('festival')
    .populate('location')
    .populate('band')
    .exec(function (err, docs) {
    res.render('performance/performances', { title: 'Performances', performances: docs});
  });
});

/* GET form performance */
router.get('/new', function(req, res, next) {
  res.render('performance/performance_form',{ title: "new performance"} );
});

router.post('/new', function(req, res, next) {
  var performance = new Performance({
            name: req.body.name
            });
  performance.save(function(err) {
    if (err) throw err;
    console.log('new performance saved successfully');
    res.redirect('/performances')
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

          console.log("festivals", festivals);
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
    performance.name     = req.body.name;
    performance.festival = req.body.festival_id;
    performance.location = req.body.location_id;
    performance.band     = req.body.band_id;
    performance.save(function(err, performance) {
      if (err) {
        res.send('unable to save performance');
      }
      else {
        res.redirect('/performances');
      };
    });
  });
});


module.exports = router;
