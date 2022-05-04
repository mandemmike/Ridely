var express = require('express');
var router = express.Router();
var Parkinglots = require('../models/parkinglot');


//POST
router.post('/api/parkinglots', function(req, res, next){
    var parkinglots = new Parkinglots(req.body);
    parkinglots.save(function(err, parkinglots) {
        if (err) { return next(err); }
        res.status(201).json(parkinglots);
    })
});
//GET ALL
router.get('/api/parkinglots', function(req, res, next){

    Parkinglots.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    });
//GET SPECIFIC
router.get('/api/parkinglots/:parking_lotId', function(req, res, next){

    Parkinglots.findOne({_id: req.params.parking_lotId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(result);
        }
        });
    });
//PUT
router.put('/api/parkinglots/:parking_lotId', function(req, res, next){

        Parkinglots.findOneAndReplace({_id: req.params.parking_lotId}, 
            req.body, {new: true},
        function(err, result) {
            if (err) {
            console.log(err);
            } else {
            res.status(200).json(result);
            }
        });
    });
//PATCH
router.patch('/api/parkinglots/:parking_lotId', function(req, res, next){

    Parkinglots.findOneAndUpdate({_id: req.params.parking_lotId}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    });
//DELETE ALL    
router.delete('/api/parkinglots', function(req, res, next){
    Parkinglots.remove({}, function(err, parkinglots) {
        if (err) { return next(err); }
        res.status(204).json(parkinglots);
    })
});
//DELETE SPECIFIC
router.delete('/api/parkinglots/:parking_lotId', function(req, res, next){
    Parkinglots.deleteOne({ _id: req.params.parking_lotId }, function(err, parkinglots) {
        if (err) { return next(err); }
        res.status(204).json(parkinglots);
    })
});

module.exports = router; 
