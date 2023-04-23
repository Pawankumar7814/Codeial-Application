const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./models/mongoose');

app.use(expressLayouts);
// Extract style and scripts from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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