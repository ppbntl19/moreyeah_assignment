const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(); // create express app

// add middleware
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


//Load api rooutes
require('./Routes')(app);

//Set up default mongoose connection
var mongoDB = process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// start express server on port 5000
app.listen(process.env.PORT || 8080, () => {
    console.log("server started on port 8000");
});