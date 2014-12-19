var React = require('react');

var Logo = React.createClass({
    render: function() {
        return (
            <a className='logo-container' href="/">
                <div className='logo'>
                    <pre className='logo-part'>____</pre>
                    <pre className='logo-part'>/\__/\</pre>
                    <pre className='logo-part'>/_/  \_\</pre>
                    <pre className='logo-part'>\ \__/ /</pre>
                    <pre className='logo-part'>\/__\/</pre>
                </div>

                <div>
                    <b>Crypto</b>
                    Gem
                </div>
            </a>
        );
    }
});

module.exports = Logo; 


