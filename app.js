var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');

var app = express();

// morgan('combined') for a lot of http info to the console
// morgan('tiny') for limited info
app.use(morgan('tiny'));
app.get('/', function(req, res){
  res.send(`Hello from my library app`);
})

app.listen(3000, function(){
  console.log(`listening on port ${chalk.green('3000')}`);
});