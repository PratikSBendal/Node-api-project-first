const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
const mongoose = require('mongoose');
// create express app


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//access control CROS error handle 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


//define a simple route
app.get('/', (req, res) => {
    
    // res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    res.sendFile(path.join(__dirname + '/hell.html'));

});

io.on('connection', function(socket) {
    console.log('A user connected');
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

require('./app/routes/note.routes.js')(app);
require('./app/routes/table.routes.js')(app);
require('./app/routes/predefine.routes.js')(app);
require('./app/routes/user.routers.js')(app);
require('./app/routes/message.routes.js')(app);

// listen for requests
http.listen(3000, () => {
    console.log("Server is listening on port 3000");
});


