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
        } catch(e) {
            encrypted = '';
        };

        return (
            <div className='body-edit'>
                <form>
                    <p>
                        <input type='text'
                            value={this.state.password}
                            onChange={this.handlePasswordChange} />
                        <button onClick={this.handleSave}>Save</button>
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

    handleSave: function() {
    },

});

module.exports = BodyEdit;

