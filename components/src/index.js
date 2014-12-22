var React = require('react');

var Body = require('./body');
var Footer = require('./footer');
var Search = require('./search');
var SearchResults = require('./search-results');
var Navigation = require('./navigation');
var Promise = require('bluebird');
var Request = require('./request')(Promise);
var SearchRequest = require('./search-request');

var Index = React.createClass({
    mixins: [ Request, SearchRequest ],

    getDefaultProps: function() {
        return {
            request: Request
        };
    },

    getInitialState: function() {
        return {
            search: ''
        }
    },

    render: function() {
        var search = <Search value={this.state.search}
                        key='search'
                        onChange={this.handleSearchChange} />;

        if (this.state.search.length) {
            return (
                <div>
                    {search}
                    <SearchResults results={this.state.searchResults} />
                </div>
            );
        } else {
            return (
                <div>
                    <Navigation />
                    {search}
                    <Body {...this.props}></Body>
                    <Footer></Footer>
                </div>
            );
        }
    },

    handleSearchChange: function(e) {
        this.setState({ search: e.target.value });
        this.search(e.target.value).then(function(data) {
            var results = data.hits.hits.map(function(hit) {
                return hit._source;
            });

            this.setState({
                searchResults: results
            });
        }.bind(this));
    }
});

if (typeof window != 'undefined') {
    window.React = React;
    window.Index = Index;
    window.sjcl = require('sjcl');
}

module.exports = Index;

