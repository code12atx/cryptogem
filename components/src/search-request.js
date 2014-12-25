module.exports = {
    search: function(string) {
        return this.props.request(
            'http://search.cryptogem.com/cryptogem/locator/_search',
            { q: 'title:' + string + '*' }
        );
    },

    searchGet: function(string) {
        return this.props.request(
            'http://search.cryptogem.com/cryptogem/locator/' + string,
            {}
        );
    },

};

