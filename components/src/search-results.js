var React = require('react');

var SearchResults = React.createClass({
    render: function() {
        if (this.props.results && this.props.results.length) {
            return (
                <ul>
                    <li>
                        <span>Found: {this.props.results.length}</span>
                    </li>
                    {this.props.results.map(function(hit) {
                        return this.renderHit(hit);
                    }.bind(this))}
                </ul>
                    
            );
        } else {
            return <div>Nothing found sorry</div>;
        }
    },

    renderHit: function(hit) {
        return (
            <li>
                <strong>{hit.title}</strong>
                <a href={'/' + hit.key}>key</a>
                <em>{hit.time}</em>
            </li>
        );
    }
});

module.exports = SearchResults;

