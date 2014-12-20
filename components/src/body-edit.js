var React = require('react');
var S3 = require('./s3');
var Encrypt = require('./encrypt');

var Password = require('./password');

var BodyEdit = React.createClass({
    mixins: [ S3, Encrypt ],

    getInitialState: function() {
        return {
            message: '',
            encrypted: '',
            password: ''
        };
    },

    render: function() {
        var encrypted = null;

        if (this.state.locatorURL) {
            return <a href={'/' + this.state.locatorURL}>Link</a>;
        }

        try {
            encrypted = JSON.parse(this.state.encrypted).ct;
        } catch(e) {}

        return (
            <div className='body-edit'>
                <form onSubmit={this.handleSave}>
                    <p>
                        <Password value={this.state.password}
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

    handleSave: function(e) {
        e.preventDefault();

        var contentURL = this.randomName().toString();
        var locatorURL = this.randomName().toString();
        var locator = this.encrypt(
            this.state.password,
            contentURL
        );

        this.upload(locatorURL, locator);
        this.upload(contentURL, this.state.encrypted);
        this.setState({
            locatorURL: locatorURL
        });
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
});

module.exports = BodyEdit;

