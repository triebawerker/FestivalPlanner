var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Musician = require('../../models/musician');
var Band = require('../../models/band');

router.get('/', function(req, res, next) {
  Musician.find({})
    .populate('band')
    .exec(function (err, docs) {
    res.render('musician/musicians', { title: 'Musicians', musicians: docs});
  });
});

router.get('/new', function(req, res, next) {
  Band.find({}, function(error, bands) {
    res.render('musician_form', { title: "new musician", bands: bands} );
  });
});

router.post('/new', function(req, res, next) {

  var musician = new Musician({
    name: req.body.name,
    band: req.body.band_id
  });

  console.log("band id: ", req.body.band_id);

  musician.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('new musician saved successfully');
    res.redirect('/admin/musicians')
  });

});

router.get('/edit/:id', function(req, res, next) {
  Band.find({}, function(error, bands) {
    Musician.findById(get_object_id(req.params.id))
                      .populate('band')
                      .exec(function(err, docs) {

      if (error) {
        console.log("Could not fetch band list");
      }
      var bandsList = [];
      bandsList = bands;

      if(err) {
        console.log("was not able to find a musician for id %s with: ", object_id, err)
      }

      res.render('musician/musician_edit', { title: "Edit musician", musician: docs, bands: bandsList });
    });
  });
});

router.post('/update/:id', function(req, res,next) {
    Musician.findById(get_object_id(req.params.id), function(err, musician) {
      musician.name = req.body.name;
      musician.band = req.body.band_id;
      musician.save(function(err, docs) {
      if (err) {
        res.send('unable to save musician');
      }
      else {
        res.redirect('/admin/musicians');
      };
    });
  });
});

module.exports = router;
