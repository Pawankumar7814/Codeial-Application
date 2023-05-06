const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
// Extract style and scripts from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//  Session part - Mongostore is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    // TODO change the secret before the deployment in the production
    secret: 'temporary',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        // dbName: 'codeial_development', // Optional
        autoRemove: 'disabled'
    }, function(err) {
        console.log(err || 'connect-mongo is setup successfully');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// To acess the static files
app.use(express.static('./assets'));

// Setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Use express router - By default it will fetch the index file
app.use('/', require('./routes'));

// Starting the server
app.listen(port, function(err) {
    if (err) {
        console.log(`Error! while running the server: ${err}`);
        return;
    }
    console.log(`Server is running on ${port}`);
});