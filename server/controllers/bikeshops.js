var express = require('express');
const app = require('../app');
var router = express.Router();
var Bikeshop = require('../models/bikeshop');
var mongoose = require('mongoose');

//POST
router.post('/api/bikeshops', function(req, res, next){
    try{
        var bikeshops = new Bikeshop(req.body);
    }catch{
        return next(err);
    }

    bikeshops.save(function(err, bikeshops) {
        if (err) { return next(err); }
        res.status(201).json(bikeshops)
    })
});

router.get('/api/bikeshops', function(req, res, next){
    
    // GET URL : http://localhost:3000/api/bikeshops?adress=mingata20
    
            try{
                var query = Bikeshop.find();
    
            for (var fieldName in req.query)
            {
                if(req.query.hasOwnProperty(fieldName))  
                {
                    if(req.query[fieldName])  
                    {
                        query.where(fieldName).equals(req.query[fieldName]);
                    }
                }
            }
            
            query.exec(function(err,data){
                if(err) { return next(err); }
                res.status(200).json(data)
            });  
        }catch(error){
            res.status(404).json()
        }
           
});
    
router.get('/api/bikeshops/:user_id', function(req, res, next){
    
    // GET URL : http://localhost:3000/api/bikeshops?adress=mingata20
    
            try{
                var query = Bikeshop.find({added_by: req.params.user_id});
    
            for (var fieldName in req.query)
            {
                if(req.query.hasOwnProperty(fieldName))  
                {
                    if(req.query[fieldName])  
                    {
                        query.where(fieldName).equals(req.query[fieldName]);
                    }
                }
            }
            
            query.exec(function(err,data){
                if(err) { return next(err); }
                res.status(200).json(data)
            });  
        }catch(error){
            res.status(404).json()
        }
           
    });
    
    

//DELETE ALL
router.delete('/api/bikeshops', function(req, res, next){
    Bikeshop.remove({}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json();
    })
});

//DELETE SPECIFIC
router.delete('/api/bikeshops/:id', function(req, res, next){
    Bikeshop.remove({_id: req.params.id}, function(err, Bikeshop) {
        if (err) { return next(err); }
        res.status(204).json(Bikeshop);
    })
});


//PUT
router.put('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndReplace({_id: req.params.id}, 
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
router.patch('/api/bikeshops/:id', function(req, res, next){

    Bikeshop.findOneAndUpdate({_id: req.params.id}, 
        req.body, {new: true},
    function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    });

//GET SPECIFIC
router.get('/api/bikeshops/:id', function(req, res, next){
    
    Bikeshop.findOne({ _id: req.params.id }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });

});

module.exports = router;
