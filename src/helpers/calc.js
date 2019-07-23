'use strict';

var CalcHelper = class Calc {

    degreesToRadians(degrees) {

        return degrees * (Math.PI / 180);
    }

    radiansToDegrees(radians) {

        return radians * (180 / Math.PI);
    }
};

export default new CalcHelper();