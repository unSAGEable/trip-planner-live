var dayRouter = require('express').Router();
var attractionRouter = require('express').Router({mergeParams:true});
var mongoose = require('mongoose');
var models ={}
models.Hotel = mongoose.model('Hotel')
models.ThingToDo = mongoose.model('ThingToDo')
models.Restaurant = mongoose.model('Restaurant')

// serves up all days
dayRouter.get('/',
  function (req, res, next) {
    models.Day
      .find().populate('hotel restaurants thingsToDo')
      .exec(function(err, popDay) {
          // popDay now has objects in place of _id s!
          res.json(popDay);
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

dayRouter.post('/reset',
  function(req, res, next){
    models.Day.collection.drop();
    var day1 = new models.Day({number:1, hotel: null})
    day1.save(function(err,day){
      res.json('deleted '+ day+ ' added');
    })
    
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
attractionRouter.delete('/hotel', function (req, res, next) {
    models.Day
      .findOne(
        {number: parseInt(req.params.id)},
        // {hotel: hotel[0]},
        function(err, data) {
          if (err) next(err)
          data.hotel = null;
          data.save(function(err, data){
            res.json(data)
          })
          
      })
});

// creates a reference to the restaurant
attractionRouter.post('/restaurants', function (req, res, next) {

    models.Restaurant.find({name: req.body.name}, function(err, restaurant){

      models.Day.findOne(
        {number: parseInt(req.params.id)},
        function(err, data) {
          if (err) next(err)
          data.restaurants.push(restaurant[0]);
          data.save(function(err, data){
            res.json(data)
          })
          
      })
    })

});

// deletes a reference to a restaurant
attractionRouter.delete('/restaurant/:index', function (req, res, next) {
      models.Day
      .findOne(
        {number: parseInt(req.params.id)},
        function(err, data) {
          if (err) next(err)
          data.restaurants.splice(parseInt(req.params.index),1);
          data.save(function(err, data){
            res.json(data)
          })
          
      })

});

// creates a reference to a thing to do
attractionRouter.post('/thingsToDo', function (req, res, next) {

    models.ThingToDo.find({name: req.body.name}, function(err, thingToDo){

      models.Day.findOne(
        {number: parseInt(req.params.id)},
        function(err, data) {
          if (err) next(err)
          data.thingsToDo.push(thingToDo[0]);
          data.save(function(err, data){
            res.json(data)
          })
          
      })
    })

});

// deletes a reference to a thing to do
attractionRouter.delete('/thingsToDo/:index', function (req, res, next) {

      models.Day
        .findOne(
          {number: parseInt(req.params.id)},
          function(err, data) {
            if (err) next(err)
            data.thingsToDo.splice(parseInt(req.params.index),1);
            data.save(function(err, data){
              res.json(data)
            })
            
        })

});


module.exports = dayRouter
