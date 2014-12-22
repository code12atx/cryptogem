var React = require('react');
var PrismCode = require('react-prism').PrismCode;

var Content = React.createClass({
    componentDidMount: function() {
        this.getDOMNode()
    },

    render: function() {
        return (
            <pre> hello
                <PrismCode onChange={this.props.onChange}>
                    {this.props.value}
                </PrismCode>
            </pre>
        );
    }
});

module.exports = Content;

