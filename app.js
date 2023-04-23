const express = require('express');
const app = express();
const port = 8000;



// Starting the server
app.listen(port, function(err) {
    if (err) {
        console.log(`Error! while running the server: ${err}`);
        return;
    }
    console.log(`Server is running on ${port}`);
});