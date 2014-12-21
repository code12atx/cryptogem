var React = require('react');
var S3 = require('./s3');
var Encrypt = require('./encrypt');

var Password = require('./password');

var View = React.createClass({
    mixins: [ S3, Encrypt ],

    getInitialState: function() {
        return {
            locator: null,
            content: null
        };
    },

    componentDidMount: function() {
        this.s3().getObject({
                Key: this.props.locator,
                Bucket: 'cryptogem.locator'
            },
            function(error, data) {
                if (error) {
                    throw error;
                }

                var body = data.Body.toString().split('$$');
                var locator = body[1];
                var metadata = body[0];

                try {
                    metadata = JSON.parse(metadata);
                } catch(e) {}

                this.setState({
                    metadata: metadata,
                    locator: locator
                });

            }.bind(this)
        );
    },

    render: function() {
        if (this.state.locator && this.state.content) {
            return this.renderContent();
        } else if (this.state.locator) {
            return this.renderPasswordPrompt();
        } else {
            return this.renderLoading();
        }
    },

    renderPasswordPrompt: function() {
        var passwordHint = this.state.metadata &&
            this.state.metadata.passwordHint;
        var passwordHintLabel = null;

        if (passwordHint) {
            passwordHintLabel = <span>Hint: {passwordHint}</span>
        }
        return (
            <div>
                <label>
                    {passwordHintLabel}
                    <Password value={this.state.password}
                        onChange={this.handlePasswordChange} />
                </label>
            </div>
        );
    },

    renderContent: function() {
        return (
            <textarea style={{ width: '100%', height: '100%' }}>{this.state.content}</textarea>
        );
    },

    renderLoading: function() {
        return <div className='loading'>Loading...</div>
    },

    handlePasswordChange: function(e) {
        var password = e.target.value;

        this.setState({ password: password });

        if (this.state.locator) {
            try {
                var url = this.decrypt(password, this.state.locator);
            } catch(e) {
            }

            if (url) {
                this.setState({ locatorURL: url });

                this.s3().getObject({
                    Key: url,
                    Bucket: 'cryptogem.content'
                }, function(error, data) {
                    if (error) {
                        throw error;
                    }

                    this.setState({
                        content: this.decrypt(password, data.Body.toString())
                    });
                }.bind(this));
            }

        }
    }
});

if (typeof window != 'undefined') {
    window.React = React;
    window.View = View;
}

module.exports = View;

