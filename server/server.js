//REQUIRES
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

//MODELS
var Message = require('./models/message.schema.js');

//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

//ROUTES
app.get('/messages', function(req, res){
  console.log('getting all messages');
  Message.find({}, function(err, data) {
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      console.log(data);
      res.send(data);
    }
  })
})

app.post('/messages', function(req, res){
  console.log(req.body);
  var message = new Message(req.body);
  message.save(function(err, data) {
    console.log('saved data:', data);
    if(err){
      console.log('save error:', err);
      res.sendStatus(500);
    } else{
      res.sendStatus(200);
    }
  });
});

//MONGOOSE CONNECTION
var databaseUrl = 'mongodb://localhost:27017/messageboard';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to : ', databaseUrl);
});

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ', err);
});

// Catch all / index
app.get('/*', function(req, res){
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

app.listen(port, function(){
  console.log('starting application');
  console.log('listening on port:', port);
});
