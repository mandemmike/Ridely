var express = require('express');
const app = require('../app');
var router = express.Router();
var Bike_service_tool = require('../models/bike_service_tool');
var Pumpstation = require('../models/pumpstation');



    router.post('/api/bike_service_tools', function(req, res, next){
        var bike_service_tool = new Bike_service_tool(req.body);
        bike_service_tool.save(function(err, bike_service_tools) {
            if (err) { return next(err); }
            res.status(201).json(bike_service_tools);
        })
    });
    
    router.get('/api/bike_service_tools', function(req, res, next){
    
        Bike_service_tool.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json(result);
            }
          });
        });
    
        router.get('/api/bike_service_tools/:bike_service_tool_id', function(req, res, next){
    
            Bike_service_tool.findOne({_id: req.params.bike_service_tool_id}, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json(result);
                }
              });
            });
            router.put('/api/bike_service_tools/:bike_service_tool_id', function(req, res, next){
    
                Bike_service_tool.findOneAndReplace({_id: req.params.bike_service_tool_id}, 
                    req.body, {new: true},
                function(err, result) {
                    if (err) {
                      res.send(err);
                    } else {
                      res.status(200).send(result);
                    }
                  });
                });
            
            router.patch('/api/bike_service_tools/:bike_service_tool_id', function(req, res, next){
    
                Bike_service_tool.findOneAndUpdate({_id: req.params.bike_service_tool_id}, 
                    req.body,{new: true},
                function(err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.json(result);
                    }
                  });
                });
    
    router.delete('/api/bike_service_tools', function(req, res, next){
        Bike_service_tool.remove({}, function(err, bike_service_tools) {
            if (err) { return next(err); }
            res.status(204).json(bike_service_tools);
        })
    });
    
    router.delete('/api/bike_service_tools/:bike_service_tool_id', function(req, res, next){
        Bike_service_tool.remove({ _id: req.params.bike_service_tool_id }, function(err, bike_service_tools) {
            if (err) { return next(err); }
            res.status(204).json(bike_service_tools);
        })
    });
    
    module.exports = router;
