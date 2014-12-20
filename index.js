var express = require('express');
var app = express();
var React = require('react');
var path = require('path');
require('node-jsx').install();

var Index = require('./components/src/index');

app.set('view engine', 'ejs');

app.use(express.static(
    path.join(__dirname, 'public')
));

app.get('/', function(req, res) {
    var componentString = React.renderToString(
        Index(), {}
    );

    res.header('Access-Control-Allow-Origin', '*');

    res.render('index', {
        main: componentString
    });
});

app.get('/:key', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    res.render('view', {
        key: req.param('key')
    });
});


app.listen(8080);

