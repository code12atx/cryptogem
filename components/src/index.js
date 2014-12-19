var React = require('react');

var Body = require('./body');
var Navigation = require('./navigation');
var Footer = require('./footer');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <Navigation />
                <Body></Body>
                <Footer></Footer>
            </div>
        );
    }
});

if (typeof window != 'undefined') {
    window.React = React;
    window.Index = Index;
}

module.exports = Index;

