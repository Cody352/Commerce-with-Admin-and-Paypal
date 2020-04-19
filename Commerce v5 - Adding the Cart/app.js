var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    products    = require('./routes/products'),
    cart        = require('./routes/cart'),
    index        = require('./routes/index'),
    seedDb      = require('./seed'),
    Product     = require('./models/product'),
    User        = require('./models/user'),
    Cart        =require('./models/cart'),
    session     =require('express-session'),
    MongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override');




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(flash());



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/commerce', {useNewUrlParser: true});


// Passport configuration
app.use(session({
    secret: "Once again Cody wins cutest dog!",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    // This will set the time for the session to be active.
    cookie: {maxAge: 5* 60 * 1000}

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
    // Session is required to pass it through all my views.
    res.locals.session = req.session;
    next();
});


app.use(products);
app.use(index);
app.use(cart);



    app.listen(process.env.PORT || 3000, function(){
        console.log('Server is listening.')
    });
