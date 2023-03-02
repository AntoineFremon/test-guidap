var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.json({message: 'hello world API'});
});

app.listen(8000, () => console.log('Running on http://localhost:8000'))