var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var User = require('../models/user');
var Product = require('../models/product');
var middleware = require('../middleware')


//  Shopping Cart route

router.get("/addtocart/:id", function(req, res){
  //  res.render('addtocart')
  var productId = req.params.id;
  // Check if cart exists. Else create a new one.
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productId, function(err, product){
      if(err){
          console.log(err);
          return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/products');
  })
});

// SHOW THE SHOPPING CART
  router.get('/addtocart', middleware.isLoggedIn, function(req, res){
      // Check if cart has any items
      if(!req.session.cart){
          return res.render('addtocart',{products: null})
      }
      var cart = new Cart(req.session.cart);
      res.render('addtocart', {products: cart.generateArray(), totalPrice: cart.totalPrice, totalItems: cart.totalItems});
  });





module.exports = router

