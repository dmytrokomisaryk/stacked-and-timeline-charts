var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
    res.render('index.html');
});

app.listen(3000);