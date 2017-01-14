var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Musician = require('../../models/musician');
var Band = require('../../models/band');

router.get('/', function(req, res, next) {
  Musician.find({})
    .populate('bands')
    .exec(function (err, docs) {
    res.render('musician/musicians', { title: 'Musicians', musicians: docs});
  });
});

router.get('/new', function(req, res, next) {
  Band.find({}, function(error, bands) {
    res.render('musician/musician_form', { title: "New musician", bands: bands} );
  });
});

router.post('/new', function(req, res, next) {

  var musician = new Musician({
    name:       req.body.name,
    instrument: req.body.instrument,
    country:    req.body.country,
    band: req.body.band_id
  });

  musician.save(function(err, new_musician) {
    if (err) {
      throw err;
    }

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
      let current_bands = musician.bands;

      musician.name       = req.body.name;
      musician.instrument = req.body.instrument;
      musician.country    = req.body.country;
      musician.bands      = req.body.band_id;
      musician.save(function(err, new_musician) {
      if (err) {
        res.send('unable to save musician');
      }

      let request_bands = [];
      if (req.body.band_id.constructor === Array) {
        for (let j in req.body.band_id) {
          request_bands.push(req.body.band_id[j]);
        }

      } else {
        request_bands.push(req.body.band_id);
      }

      // get old an new bands
      let new_bands = request_bands;
      let old_bands = [];
      for (let band in current_bands) {
        if (request_bands.indexOf(band) > -1) {
          old_bands.push(request_bands[band]);
          new_bands.splice(band, 1);
        }
      }

      updateBand(old_bands, new_bands, musician._id);

      res.redirect('/admin/musicians');
    });
  });
});

updateBand = function(old_bands, new_bands, musician_id) {

  // remove musician from current band
  if (old_bands.length != undefined) {
    for (let current_band_id in old_bands) {
      Band.findById(get_object_id(old_bands[current_band_id]), function(err, band) {
        if (band.musicians.indexOf(get_object_id(musician_id)) > -1) {
            band.musicians.splice(band.musicians.indexOf(get_object_id(musician_id)), 1);
            band.save(function(error, band) {
              if(err) {
                console.log("unable to save band after removing band");
              }
            });
        } else {
            console.log("musician not found on current band");
        }
      });
    }
  }


  // add musician if not yet exists
  if (new_bands == undefined) return;

  for (let new_band_id in new_bands) {
    Band.findById(get_object_id(new_bands[new_band_id]), function(err, band) {
      if (band.musicians.indexOf(musician_id) > -1) {
      } else {
        band.musicians.push(musician_id);
        band.save(function(error, band) {
          if (err) {
            console.log("unable to save band with new_musician");
          }
        });
      }

    });
  }
}

module.exports = router;
