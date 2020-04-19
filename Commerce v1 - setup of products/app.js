var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    products    = require('./routes/products'),
    seedDb      = require('./seed'),
    Product     = require('./models/product'),
    methodOverride = require('method-override');




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/commerce', {useNewUrlParser: true});


app.use('/', products);



    app.listen(process.env.PORT || 3000, function(){
        console.log('Server is listening.')
    });
