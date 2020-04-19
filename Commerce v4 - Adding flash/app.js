var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    products    = require('./routes/products'),
    index        = require('./routes/index'),
    seedDb      = require('./seed'),
    Product     = require('./models/product'),
    User        = require('./models/user'),
    methodOverride = require('method-override');




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));
app.use(flash());



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/commerce', {useNewUrlParser: true});


// Passport configuration
app.use(require('express-session')({
    secret: 'any secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Calling locals.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.use(products);
app.use(index);



    app.listen(process.env.PORT || 3000, function(){
        console.log('Server is listening.')
    });
