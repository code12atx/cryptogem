var S3 = require('./s3');

module.exports = {
    s3: function() {
        var s3 = new AWS.S3();
        s3.config.region = 'us-east-1';
        s3.config.credentials = 'us-east-1';

        s3.config.update({
            accessKeyId: 'AKIAICAGAJ3CSF6BWHHQ',
            secretAccessKey: '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'
        });

        window.s3 = s3;

        return s3;
    },

}

