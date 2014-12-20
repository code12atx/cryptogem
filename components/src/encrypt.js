var sjcl = require('sjcl');

module.exports = {
    encrypt: function(password, message) {
        return sjcl.encrypt(password, message);
    },

    decrypt: function(password, message) {
        return sjcl.decrypt(password, message);
    }
};

