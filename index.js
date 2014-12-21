var express = require('express');
var app = express();
var React = require('react');
var path = require('path');
require('node-jsx').install();

var s3Credentials = require('./config/s3-credentials-client.json');
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
        s3Credentials: JSON.stringify(s3Credentials),
        main: componentString
    });
});

app.get('/:key', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    res.render('view', {
        s3Credentials: JSON.stringify(s3Credentials),
        key: req.param('key')
    });
});


app.listen(8888);

