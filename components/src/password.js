var React = require('react');

var Password = React.createClass({
    getInitialState: function() {
        return {
            show: false
        };
    },

    render: function() {
        return (
            <p>
                <label>Password: </label>

                <input value={this.props.password}
                    type={this.state.show ?
                        'text' : 'password' }
                    onChange={this.props.onChange} />
                <button>Save</button>

                <label>Show Password:</label>

                <input type='checkbox'
                    checked={this.props.show}
                    onChange={this.handleShowChange} />
            </p>
        );
    },

    handleShowChange: function(e) {
        this.setState({
            show: e.target.checked
        });
    }
});

module.exports = Password;

