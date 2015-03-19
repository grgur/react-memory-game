/**
 * Card on the board
 */
'use strict';
var React = require('react');

var Card = React.createClass({
    getInitialState: function () {
        return {
            locked: false,
            toggled: false,
            found: false
        };
    },

    onCardClick: function () {
        var me = this,
            state = me.state;

        if (!state.toggled) {
            me.turn();
        }
    },

    turn: function () {
        var me = this;
        if (me.state.locked === true) {
            return;
        }
        me.setState({toggled: !this.state.toggled});
        me.getDOMNode().classList.toggle('hover');
    },

    render: function () {
        var icon = this.props.icon,
            backClassName = 'back fa fa-' + icon,
            frontClassName = 'front fa fa-question';

         if (this.state.found === true) {
            backClassName += ' found';
         }

        return (
            <div className="card" onClick={this.props.onClick}>
                <div className={frontClassName}></div>
                <div className={backClassName}></div>
            </div>
        );
    }
});

module.exports = Card;
