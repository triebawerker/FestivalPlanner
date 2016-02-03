var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Band = require('../models/band');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bands', function(req, res, next) {
  console.log('in bands get');
  Band.find({}, function (err, docs) {
    console.log(docs);
    res.render('bands', { title: 'Bands', bands: docs});
  });
});

/* GET form band */
router.get('/band', function(req, res, next) {
  res.render('band_form', { title: "new band"} );
});

router.post('/band', function(req, res, next) {
  console.log(req.body)
  var band = new Band({
            name: req.body.name
            });
  band.save(function(err) {
    if (err) throw err;
    console.log('new band saved successfully');
    res.redirect('/bands')
  });
});

router.get('/band/:id', function(req, res, next) {
  console.log(req.params.id);
  var Object_id = mongoose.Types.ObjectId(req.params.id);
  Band.findById(Object_id, function(err, band) {

    if(err) {
      console.log("was not able to find a band for id %s with: ", object_id, err)
    }
    res.render('band_edit', { title: "Edit band", band: band });
  });
});

router.post('/band/:id', function(req, res,next) {
  var object_id = mongoose.Types.ObjectId(req.params.id);
  Band.findById(object_id, function(err, band) {
    band.name = req.body.name;
    band.save(function(err, band) {
      if (err) {
        res.send('unable to save band');
      }
      else {
        res.redirect('/bands');
      };
    });
  });
});

module.exports = router;
