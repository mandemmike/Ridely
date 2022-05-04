var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parkinglotSchema = new Schema({
    parking_lotId: Schema.Types.ObjectId,
    address:{
        city: String,
        street: String,
        zip_code: String},
    added_by: {type: Schema.Types.ObjectId, ref: 'users'}
    

}, 
{collection: "parkinglots_collection"});

const Parkinglot = module.exports = mongoose.model('parkinglots', parkinglotSchema);


module.exports.getparkinglotById = function (id, callback)
{
    Parkinglot.findById(id, callback);
}

module.exports.addParkinglot = function (newParkinglot, callback)
{
    newParkinglot.save(callback);
}

module.exports.updateParkinglot = function (condition, update, callback)
{
    Parkinglot.findOneAndReplace(condition,update, callback);
}