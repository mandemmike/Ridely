var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    //registration_date: {type: Date.now().String},
    additions: {type: [Schema.Types.ObjectId]}
    


});

const User = module.exports = mongoose.model('user', userSchema);
