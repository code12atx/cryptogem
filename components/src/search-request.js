module.exports = {
    search: function(string) {
        return this.props.request(
            'http://localhost:9200/cryptogem/locator/_search',
            { q: 'title:' + string + '*' }
        );
    },

    searchGet: function(string) {
        return this.props.request(
            'http://localhost:9200/cryptogem/locator/' + string,
            {}
        );
    },

};

