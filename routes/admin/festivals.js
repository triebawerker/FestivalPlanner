var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Festival = require('../../models/festival');

router.get('/', function(req, res, next) {
  Festival.find({}, function (err, docs) {
    console.log("I am here with data ", docs);
    res.render('festival/festivals', { title: 'Festival', festivals: docs});
  });
});

/* GET form festival */
router.get('/new', function(req, res, next) {
  res.render('festival/festival_form', { title: "new festival"} );
});

router.post('/new', function(req, res, next) {
  var festival = new Festival({
            name: req.body.name,
            year: req.body.year
            });
  festival.save(function(err) {
    if (err) throw err;
      console.log('new festival saved successfully');
    res.redirect('/admin/festivals')
  });
});

router.get('/edit/:id', function(req, res, next) {

  Festival.findById(get_object_id(req.params.id), function(err, festival) {
    if(err) {
      console.log("was not able to find a festival for id %s with: ", object_id, err)
    }
    res.render('festival/festival_edit', { title: "Edit festival", festival: festival });
  });
});

router.post('/update/:id', function(req, res,next) {
  Festival.findById(get_object_id(req.params.id), function(err, festival) {
    festival.name = req.body.name;
    festival.year = req.body.year;
    festival.save(function(err, festival) {
      if (err) {
        res.send('unable to save festival');
      }
      else {
        res.redirect('/admin/festivals');
      };
    });
  });
});


module.exports = router;
