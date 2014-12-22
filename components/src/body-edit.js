var React = require('react');
var sha1 = require('sha1');

var S3 = require('./s3');
var Encrypt = require('./encrypt');
var SearchRequest = require('./search-request');

var Password = require('./password');

var BodyEdit = React.createClass({
    mixins: [ S3, Encrypt, SearchRequest ],

    getInitialState: function() {
        return {
            message: '',
            encrypted: '',
            password: '',
            showInSearch: false,
            title: '',
            passwordHint: ''
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
                    </p>

                    <p>
                        {this.renderShowInSearch()}
                    </p>

                    <p>
                        <textarea value={this.state.message}
                            onChange={this.handleMessageChange} />
                    </p>

                    <p className='encrypted-data'>
                        <textarea value={encrypted} />
                    </p>
                </form>
            </div>
        );
    },

    renderShowInSearch: function() {
        if (this.state.showInSearch) {
            return (
                <div>
                    <label>
                        Title
                        <input type='text'
                            value={this.state.title}
                            onChange={this.handleTitleChange} />
                    </label>
                    <br />

                    <label>
                        Password Hint
                        <input type='text'
                            value={this.state.passwordHint}
                            onChange={this.handlePasswordHintChange} />
                    </label>
                    <br />


                    <label>
                        Show in search
                        <input type='checkbox'
                            checked={this.state.showInSearch}
                            onChange={this.handleShowInSearchChange} />
                    </label>
                </div>
            );
        } else {
            return (
                <label>
                    Show in search
                    <input type='checkbox'
                        checked={this.state.showInSearch}
                        onChange={this.handleShowInSearchChange} />
                </label>
            );
        }
    },

    handlePasswordHintChange: function(e) {
        this.setState({
            passwordHint: e.target.value
        });
    },

    handleTitleChange: function(e) {
        this.setState({
            title: e.target.value
        });
    },

    handleShowInSearchChange: function(e) {
        this.setState({
            showInSearch: e.target.checked
        });
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

        if (this.state.showInSearch && this.state.title) {
            return this.searchGet(this.state.title).then(function() {
                this.saveTitleNotAvailable();
            }.bind(this)).catch(function() {
                this.actuallySave(this.state.title);
            }.bind(this));

        }

        this.actuallySave();
    },

    actuallySave: function(locatorURL) {
        var contentURL = sha1(this.state.encrypted);
        var locatorURL = locatorURL || this.randomName();
        var locator = this.encrypt(
            this.state.password,
            contentURL
        );


        this.uploadLocator(locatorURL, locator);
        this.uploadContent(contentURL, this.state.encrypted);
        this.setState({
            locatorURL: locatorURL
        });
    },

    randomName: function() {
        var randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
        var date = Date.now();

        return sha1(randomNumber * date);
        // TODO: use crypto random
        return Math.round(Math.random() * 10000);
    },

    uploadContent: function(key, value) {
        this.upload('cryptogem.content', key, value, function(error, value) {
            if (error) {
                throw error;
            }
        });
    },

    uploadLocator: function(key, value) {
        value = '$$' + value;

        if (this.state.showInSearch) {
            value = JSON.stringify({
                title: this.state.title,
                passwordHint: this.state.passwordHint
            }) + value;
        }

        this.upload('cryptogem.locator', key, value, function(error, value) {
            if (error) {
                throw error;
            }
        });
    },

    upload: function(bucket, key, value, cb) {
        var s3 = this.s3();

        var params = {
            Bucket: bucket,
            Key: key,
            Body: value
        };

        s3.upload(params, cb);
    },
});

module.exports = BodyEdit;

