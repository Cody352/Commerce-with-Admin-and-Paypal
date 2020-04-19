var express     = require('express'),
    mongoose    = require('mongoose');


var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    slug: String
   
 });










module.exports = mongoose.model('Product', productSchema);
