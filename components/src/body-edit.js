var React = require('react');
var sjcl = require('sjcl');

var BodyEdit = React.createClass({
    getInitialState: function() {
        return {
            message: '',
            encrypted: '',
            password: ''
        };
    },

    render: function() {
        var encrypted = null;

        try {
            encrypted = JSON.parse(this.state.encrypted).ct;
        } catch(e) {}

        return (
            <div className='body-edit'>
                <form onSubmit={this.handleSave}>
                    <p>
                        <input type='text'
                            value={this.state.password}
                            onChange={this.handlePasswordChange} />
                        <button>Save</button>
                    </p>

                    <textarea value={this.state.message}
                        onChange={this.handleMessageChange} />

                    <p className='encrypted-data'>
                        <textarea value={encrypted} />
                    </p>
                </form>
            </div>
        );
    },

    handleMessageChange: function(e) {
        var message = e.target.value;
        var password = this.state.password;

        this.setState({
            message: message,
            encrypted: this.encrypt(password, message)
        });
    },

    handlePasswordChange: function(e) {
        var message = this.state.message;
        var password = e.target.value;

        this.setState({
            password: password,
            encrypted: this.encrypt(password, message)
        });
    },

    encrypt: function(password, message) {
        return sjcl.encrypt(password, message);
    },

    handleSave: function(e) {
        e.preventDefault();
        debugger;

        var contentURL = this.randomName().toString();
        var locatorURL = this.randomName().toString();
        var locator = this.encrypt(
            this.state.password,
            contentURL
        );

        this.upload(locatorURL, locator);
        this.upload(contentURL, this.state.encrypted);
    },

    randomName: function() {
        // TODO: use crypto random
        return Math.round(Math.random() * 10000);
    },

    upload: function(key, value, cb) {
        var s3 = this.s3();

        var params = {
            Bucket: 'cryptogem',
            Key: key,
            Body: value
        };

        s3.upload(params, function(error) {
            if (error) {
                throw(error);
            }
        });
    },

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

});

module.exports = BodyEdit;

