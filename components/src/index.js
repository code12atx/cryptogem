var React = require('react');

var Body = require('./body');
var Navigation = require('./navigation');
var Footer = require('./footer');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <Navigation />
                <Body {...this.props}></Body>
                <Footer></Footer>
            </div>
        );
    }
});

if (typeof window != 'undefined') {
    window.React = React;
    window.Index = Index;
    window.sjcl = require('sjcl');
}

module.exports = Index;

