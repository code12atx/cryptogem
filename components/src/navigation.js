var React = require('react');
var Logo = require('./logo');

var Navigation = React.createClass({
    render: function() {
        return (
            <div>
                <Logo />

                <ul className='nav-links'>
                    <li className='nav-link'>
                        <a href='/#/about'>about</a>
                    </li>

                    <li className='nav-link'>
                        <a href='https://github.com/joshua-robinson/cryptogem'>github</a>
                    </li>

                    <li class='nav-link'>
                        <a href='/#/faq'>faq</a>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = Navigation;

