var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeshopSchema = new Schema({
    name:{type: String},
    address:{
        city: String,
        street: String,
        zip_code: String},
    rating: {type: Number},
    added_by: { type: Schema.Types.ObjectId, ref: 'users' },
    lat: { type: Number },
    lng: { type: Number}


}, 
{ collection: "bikeshops_collection" });

const Bikeshop = module.exports = mongoose.model('bikeshop', bikeshopSchema);


module.exports.getBikeshopById = function (id, callback)
{
    Bikeshop.findById(id, callback);
}

module.exports.addBikeshop = function (newBikeshop, callback)
{
    newBikeshop.save(callback);
}

module.exports.updateBikeshop = function (condition, update, callback)
{
    Bikeshop.findOneAndReplace(condition,update, callback);
}
