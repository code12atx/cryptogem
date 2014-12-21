var React = require('react');

var Search = React.createClass({
    render: function() {
        return (
            <div>
                <label>Search:</label>
                <input type='text'
                    value={this.props.value}
                    onChange={this.props.onChange} />
            </div>
        );
    }
});

module.exports = Search;

