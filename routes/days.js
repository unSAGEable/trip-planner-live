var dayRouter = require('express').Router();
var attractionRouter = require('express').Router({mergeParams:true});
var models = require('../models');

// serves up all days
dayRouter.get('/',
  function (req, res, next) {
    models.Day
      .find({})
      .exec()
      .then(function(days){
        res.json(days);
      });
})

// creates a new day and serves it up as json
dayRouter.post('/',
  function (req, res, next) {
    var newDay = new models.Day();
    newDay.number = req.body.number;
    newDay.save(function(err, day){
      if(err) return next(err);
      console.log(day);
      res.json(day);
    })
    
})

dayRouter.post('/delete',
  function(req, res, next){
    models.Day.collection.drop();
    res.json('deleted');
  })


// serves particular day as json
dayRouter.get('/:id',
  function (req, res, next) {
    models.Day
      .findById(req.params.id)
      .exec(function(err,day){
        res.locals.current_day = day;
        next();
      })
})

// deletes a particular day
dayRouter.delete('/:id',
  function (req, res, next) {
    models.Day
      .find({number: parseInt(req.params.id)})
      .remove(function(err,data){
        if(err) return next(err);
        res.json('removed');
      })

})

dayRouter.use('/:id', attractionRouter);

// creates a reference to the hotel
attractionRouter.post('/hotel', function (req, res, next) {
  // models.Hotel.find({name: req.body.name}, function(err, hotel){console.log(hotel)})
  models.Hotel.find({name: req.body.name}, function(err, hotel){

      models.Day.findOne(
        {number: parseInt(req.params.id)},
        // {hotel: hotel[0]},
        function(err, data) {
          if (err) next(err)
          data.hotel = hotel[0];
          data.save(function(err, data){
            res.json(data)
          })
          
      })
    })
    
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


module.exports = dayRouter
