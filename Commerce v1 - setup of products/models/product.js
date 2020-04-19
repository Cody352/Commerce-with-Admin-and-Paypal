var express     = require('express'),
    mongoose    = require('mongoose');


var productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
});









module.exports = mongoose.model('Product', productSchema);
