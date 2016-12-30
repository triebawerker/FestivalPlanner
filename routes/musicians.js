var express = require('express');
var router = express.Router();
var get_object_id = require('../helper');

var Musician = require('../models/musician');

router.get('/', function(req, res, next) {
  Musician.find({}, function (err, docs) {
    res.render('musicians', { title: 'Musicians', musicians: docs});
  });
});

router.get('/new', function(req, res, next) {
  res.render('musician_form', { title: "new musician"} );
});

router.post('/new', function(req, res, next) {
  var musician = new Musician({
            name: req.body.name
            });
  musician.save(function(err) {
    if (err) throw err;
    console.log('new musician saved successfully');
    res.redirect('/musicians')
  });
});

router.get('/edit/:id', function(req, res, next) {

  Musician.findById(get_object_id(req.params.id), function(err, docs) {
    if(err) {
      console.log("was not able to find a musician for id %s with: ", object_id, err)
    }
    res.render('musician_edit', { title: "Edit musician", musician: docs });
  });
});

router.post('/update/:id', function(req, res,next) {
    Musician.findById(get_object_id(req.params.id), function(err, musician) {
    musician.name = req.body.name;
    musician.save(function(err, docs) {
      if (err) {
        res.send('unable to save musician');
      }
      else {
        res.redirect('/musicians');
      };
    });
  });
});

module.exports = router;
