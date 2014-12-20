var React = require('react');

var BodyEdit = require('./body-edit');

var Body = React.createClass({
    render: function() {
        return (
            <div>
                <BodyEdit {...this.props} />
            </div>
        );
    }
});

module.exports = Body;


