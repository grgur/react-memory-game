/**
 * Common utility functions
 */
'use strict';

var Util = {

    /**
     * Randomize items in array
     * @param  {Mixed[]} array Array to shuffle
     * @return {Mixed[]}       Shuffled array
     */
    arrayShuffle: function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};

module.exports = Util;
