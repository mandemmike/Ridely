var express = require('express');
const app = require('../app');
var router = express.Router();
var Pumpstation = require('../models/pumpstation');

    router.post('/api/pumpstations', function(req, res, next){
        var pumpstation = new Pumpstation(req.body);
        pumpstation.save(function(err, pumpstation) {
            if (err) { return next(err); }
            res.status(201).json(pumpstation);
        })
    });
    
    router.get('/api/pumpstations', function(req, res, next){
    
        Pumpstation.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json(result);
            }
          });
        });
    
        router.get('/api/pumpstations/:pumpstation_id', function(req, res, next){
    
            Pumpstation.findOne({_id: req.params.pumpstation_id}, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json(result);
                }
              });
            });
            router.put('/api/pumpstations/:pumpstation_id', function(req, res, next){
    
                Pumpstation.findOneAndReplace({_id: req.params.pumpstation_id}, 
                    req.body, {new: true},
                function(err, result) {
                    if (err) {
                      res.send(err);
                    } else {
                      res.status(200).send(result);
                    }
                  });
                });
            
            router.patch('/api/pumpstations/:pumpstation_id', function(req, res, next){
    
                Pumpstation.findOneAndUpdate({_id: req.params.pumpstation_id}, 
                    req.body, {new: true},
                function(err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.json(result);
                    }
                  });
                });
    
    router.delete('/api/pumpstations', function(req, res, next){
        Pumpstation.remove({}, function(err, pumpstation) {
            if (err) { return next(err); }
            res.status(204).json(pumpstation);
        })
    });
    
    router.delete('/api/pumpstations/:pumpstation_id', function(req, res, next){
        Pumpstation.remove({ _id: req.params.pumpstation_id }, function(err, pumpstation) {
            if (err) { return next(err); }
            res.status(204).json(pumpstation);
        })
    });
    
    module.exports = router;
