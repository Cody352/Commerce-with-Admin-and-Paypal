var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var middleware = require('../middleware');


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



module.exports = router;
