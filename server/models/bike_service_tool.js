var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bikeshop = require('../models/bikeshop');

var bike_service_toolSchema = new Schema({
    bike_service_tool_id: Schema.Types.ObjectId,
    name: String,
    pumpstation: {type: Schema.Types.ObjectId, ref:'pumpstations'}

});

module.exports = mongoose.model('bike_service_tools', bike_service_toolSchema);
