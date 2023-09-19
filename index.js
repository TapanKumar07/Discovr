const express = require('express');
require('dotenv').config();
const router = require('./src/routes/indexRoutes');
const {connect} = require('./src/config/database');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const passport = require('./src/config/passport-local-strategy');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const flash = require('connect-flash');
const {setFlash} = require('./src/config/middleware');



const app = express();


app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.use(sassMiddleware({
    src: 'src/assets/'
    , dest: 'src/assets/'
    , outputStyle: 'expanded',
}));



app.use(expressLayouts);
app.use(express.static(__dirname + '/src/assets'));


app.set('layout extractStyles' ,true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('layout',__dirname + '/src/views/layouts/layout.ejs');
app.set('views', './src/views');


app.use(session({
    name : "twitter",
    secret : 'thisisbuk',
    resave: false,
    cookie : {
        maxAge: 6000000
    },
    store : new mongoStore({
        mongoUrl : process.env.MONGO_URI,
        autoRemove : 'disable'
    }, function(err){
        if(err)
           console.error(err);
        console.log('connect-mongo setup done');
    })
}))


app.use(flash());
app.use(setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
 
app.use('/', router);



const chatEngine = require('http').Server(app);
const {socket} = require('./src/config/sockets');
socket(chatEngine);

chatEngine.listen( process.env.PORT || 3001, async function() {
    // const gfs = Grid(mongoose.connection);
    //console.log(mongoose.connection);
    await connect();
    console.log("App listening at 3001")
});

