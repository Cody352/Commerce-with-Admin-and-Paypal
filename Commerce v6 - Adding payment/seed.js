var express = require('express');
var mongoose = require('mongoose');
var Product = require('./models/product');

var data = [
    
    {
    image: 'https://images.unsplash.com/photo-1545034210-264a82b4688b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    name: 'Couch',
    description: 'The best place in your house.',
    price: '1200'
},

{
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    name: 'Living room suite.',
    description: 'Where family gather.',
    price: '1800'
},

{
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    name: 'Five seater patio set.',
    description: 'You cannot wait to be here.',
    price: '1500'
},

{
    image: 'https://images.unsplash.com/photo-1507452786732-f2dc0a2e7b7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    name: 'Living room Suite.',
    description: 'The best place to have all your friends and family',
    price: '2800'
},

]

function seedDB(){
    //Remove all products
    Product.deleteMany({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed products!");
          //add a few products
         data.forEach(function(seed){
             Product.create(seed, function(err, product){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added a product");
                    product.save();
                                 
                             }
                         });
                 }
             );
         });
     }; 
     

 module.exports = seedDB;
 