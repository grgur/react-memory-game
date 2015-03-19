/**
 * Board
 */
'use strict';
var React = require('react'),
    Card = require('./Card'),
    Util = require('../Util');

var playingCards = [
    'train', 'subway', 'venus-double', 'venus-mars', 'mars-stroke', 'mars',
    'ship', 'anchor', 'cloud', 'cloud-upload', 'cloud-download', 'cube', 'cubes',
    'check-circle', 'check-circle-o', 'diamond', 'child', 'bullhorn', 'bolt',
    'female', 'eye', 'cutlery', 'heartbeat', 'heart', 'heart-o', 'medkit', 'fighter-jet'

];

var Board = React.createClass({
    onCardClick: function (index) {
        var me = this,
            card = me.refs['card' + index],
            state = me.state,
            icon = card.props.icon,
            selected = state.selected;

        if (selected === card || state.locked === true) {
            return;
        }

        if (selected) {
            if (selected.props.icon === icon) {
                selected.setState({locked: true, found: true});
                card.setState({locked: true, found: true});
                me.setState({selected: null, remaining: me.state.remaining -= 2});
            } else {
                me.setState({locked: true});
                setTimeout(function () {
                    me.unFlipCards([selected, card]);
                    me.setState({selected: null, locked: false});
                }, 1000);
            }
        } else {
            me.setState({selected: card});
        }

        card.onCardClick();

        if (me.state.remaining < 1) {
            console.log('Finished! Yay!');
        }
    },

    unFlipCards: function (cards) {
        cards.map(function (card) {
            if (card && card.turn) {
                card.turn();
            }
        });
    },

    unFlipAll: function () {
        var card, i;

        for (i in this.refs) {
            if (this.refs.hasOwnProperty(i)) {
                card = this.refs[i];

                if (card.state.toggled === true) {
                    card.turn();
                }
            }
        }

        this.setState({selected: null, locked: false});
    },

    getInitialState: function () {
        var boardSize = 12,
            allCards = Util.arrayShuffle(playingCards.slice(0)), // clone playing cards and randomize
            chosenCards = allCards.slice(0, boardSize / 2), // choose just enough for the target board size
            fullDeck = chosenCards.concat(chosenCards); //add a pair to each card

        Util.arrayShuffle(fullDeck);

        return {
            boardSize: boardSize,
            cards: fullDeck,
            selected: null,
            locked: false,
            remaining: boardSize
        };
    },

    render: function () {
        var won = this.state.remaining < 1,
            boardCls = "board" + ( won ? " win" : "" );

        return (
            <div className={boardCls}>
                <div className="win">Win!</div>
                {this.state.cards.map(function (card, i) {
                    var ref = 'card' + i,
                        boundClick = this.onCardClick.bind(this, i);

                    return <Card icon={card} key={i} ref={ref} onClick={boundClick} />;
                }, this)}
            </div>
        );
    }
});

module.exports = Board;
