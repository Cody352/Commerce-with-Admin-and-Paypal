var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var middleware = require('../middleware');
var paypal = require('paypal-rest-sdk');


// SHOW THE LANDING PAGE
router.get('/', function(req, res){
    res.render('landing')
});


// Get the register form
router.get('/register', function(req, res){
    res.render('./register')
});

// Handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'adminsecret'){
        newUser.isAdmin = true;
    };
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("landing");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Commerce " + user.username);
           res.redirect('./products'); 
        });
    });
});


// Get the login form
router.get('/login',function(req, res){
    res.render('./login')
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/products",
        failureRedirect: "/login"
    }),
    // We can have a callback here but not required because we use the above middleware.
);

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/products");
});


// PAYPAL SETUP
router.get('/index', function(req, res){
    res.render('index')
});



router.get('/paypal', function(req, res){
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href)
            
        }
    });
    
});

router.get('/success', function(req, res){
    // res.send('success')
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    
    
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});


router.get('/cancel', function(req, res){
    res.render('cancel')
});


module.exports = router;
