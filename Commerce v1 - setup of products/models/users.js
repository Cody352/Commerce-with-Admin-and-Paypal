var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: Password, required:true}
});








module.exports = mongoose.model('User', userSchema);
