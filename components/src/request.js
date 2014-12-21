var _ = require('lodash');

module.exports = function(Promise) {
    return function(url, options) {
        var deferred = Promise.defer();

        options = options || {};

        options = _.clone(options);

        var query = [];

        for (var key in options) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(options[key]));
        }

        var params = query.join('&');

        var xhr =  new XMLHttpRequest();

        xhr.open('GET', url + '?' + params);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            }

            var data = xhr.response;

            if (xhr.status == 200) {
                data = deferred.resolve(JSON.parse(data));
            } else {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    data = { message: 'Internal Unknown Error' };
                }

                deferred.reject(data);
            }
        }.bind(this)

        return deferred.promise;
    }
}

