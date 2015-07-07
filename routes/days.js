var router = require('express').Router();
var models = require('../models');

// serves up all days
router.get('/',
  function (req, res, next) {
    models.Day
      .find({})
      .exec(function (err, days) {
        res.locals.all_days = days;
        next();
      });
})

// creates a new day and serves it up as json
router.post('/',
  function (req, res, next) {
    console.log('doing something');
})

// serves particular day as json
router.get('/:id',
  function (req, res, next) {
    models.Day
      .findById(req.params.id)
      .exec(function(err,day){
        res.locals.current_day = day;
        next();
      })
})

// deletes a particular day
router.delete('/:id',
  function (req, res, next) {
    models.Day
      .findById(req.params.id)
      .remove(function(err,day){
        next();
      })
})
/*
//router.use('/:id', attractionRouter);

// creates a reference to the hotel
attractionRouter.post('/hotel', function (req, res, next) {
    models.Hotel.create(req.body);
    models.Hotel.save();
    next();
});

// deletes the reference to the hotel
// attractionRouter.delete('/hotel', function (req, res, next) {
//     models.Day
//       .findById(req.params.id)
//       .remove(function(err,day){
//           day.remove day.hotel;
//       })
// });

// creates a reference to the restaurant
attractionRouter.post('/restaurants', function (req, res, next) {
});

// deletes a reference to a restaurant
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
});

// creates a reference to a thing to do
attractionRouter.post('/thingsToDo', function (req, res, next) {
});

// deletes a reference to a thing to do
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
});
*/

module.exports = router
