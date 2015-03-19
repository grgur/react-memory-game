'use strict';

var React = require('react'),
    Board = require('./components/Board');

React.initializeTouchEvents(true);

var App = React.createClass({
    render: function () {
        return (
            <div>
                <div className="page-header">
                    < h1 > <i className="fa fa-user-secret"></i> Memory Board < /h1>
                </div>
                <Board />
            </div>
        );
    }
});

React.render(<App />, document.body);

module.exports = App;
