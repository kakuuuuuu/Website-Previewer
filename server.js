var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');


// require('./server/config/mongoose.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/static"))


var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000,function(){
  console.log('Sass Labs Coding Challenge on port 8000')
})
