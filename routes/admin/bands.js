var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Band = require('../../models/band');

router.get('/', function(req, res, next) {
  Band.find({}, function (err, docs) {
    res.render('band/bands', { title: 'Bands', bands: docs});
  });
});

/* GET form band */
router.get('/new', function(req, res, next) {
  res.render('band/band_form', { title: "New band"} );
});

router.post('/new', function(req, res, next) {
  var band = new Band({
            name: req.body.name,
            image: req.body.imageUrl
            });
  band.save(function(err) {
    if (err) throw err;
    console.log('new band saved successfully');
    res.redirect('/admin/bands')
  });
});

router.get('/edit/:id', function(req, res, next) {

  Band.findById(get_object_id(req.params.id), function(err, band) {
    if(err) {
      console.log("was not able to find a band for id %s with: ", object_id, err)
    }
    res.render('band/band_edit', { title: "Edit band", band: band });
  });
});

router.post('/update/:id', function(req, res,next) {
  Band.findById(get_object_id(req.params.id), function(err, band) {
  console.log("store new name");
    band.name = req.body.name;
    band.imageUrl = req.body.imageUrl;
    band.save(function(err, band) {
      if (err) {
        res.send('unable to save band');
      }
      else {
      console.log("it should redirect");
        res.redirect('/admin/bands');
      };
    });
  });
});

module.exports = router;
