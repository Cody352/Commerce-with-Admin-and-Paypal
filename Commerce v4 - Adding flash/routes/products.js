var express     = require('express'),
    mongoose    = require('mongoose'),
    router      = express.Router();
    var Product = require('../models/product')
    var middleware = require('../middleware');

    

// SHOW THE LANDING PAGE
router.get('/', function(req, res){
    res.render('landing', {currentUser: req.user})
});

// SHOW ALL PRODUCTS
router.get('/products', function(req, res){
    Product.find({}, function(err, allProducts){
        if(err){
            console.log(err)
            req.flash('error', err.message, {error: req.flash()})
        }else{
            res.render('./products/index', {products: allProducts, currentUser: req.user})
        };
    });
    
});

//NEW - SHOW FORM TO CREATE A NEW PRODUCT
router.get("/products/new", function(req, res){
    res.render("./products/new"); 
 });


// CREATE A PRODUCT
router.post('/products',middleware.isLoggedIn, function(req, res){
    // Get data from form and add to campgrounds array.
    var image = req.body.image;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var newProduct = {image: image, name: name, description: description, price: price}
    // Create a new product and save to db.
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated)
            res.redirect('./products')
        };
    });
});




//  SHOW - shows more info about one product
router.get('/products/:id',middleware.isLoggedIn, function(req, res){
    // Get the product by id.
    Product.findById((req.params.id), function(err, foundProduct){
        // Show the product
        if(err){
            console.log(err)
        }else{
            console.log(foundProduct)
            res.render('./products/show', {products: foundProduct});
        };
    });
});


// EDIT A PRODUCT
// SHOW THE EDIT FORM
router.get('/products/:id/edit', function(req, res){
    Product.findById((req.params.id), function(err, foundProduct){
        if(err){
            console.log(err)
        }else{
            res.render('./products/edit', {products: foundProduct, currentUser: req.user})
        };
    });
});

// UPDATE THE EDITED PRODUCT
router.put('/products/:id', function(req, res){
    Product.findByIdAndUpdate((req.params.id),(req.body.products), function(err, updatedProduct){
        if(err){
            console.log(updatedProduct)
        }else{
            console.log(updatedProduct);
            res.redirect('/products')
        };
    });
});

// DELETE A PRODUCT
router.delete('/products/:id', function(req, res){
    Product.findByIdAndRemove((req.params.id), function(err, deletedProduct){
        if(err){
            console.log(err)
        }else{
            res.redirect('/products', {currentUser: req.user})
        };
    });
});





module.exports = router;
