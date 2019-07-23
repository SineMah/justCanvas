'use strict';

import Form from '../objects/form.js';

var bezier = class Bezier extends Form {

	constructor(ctx) {

        super(ctx);

        this._coordinates = [];
	}

    coordinates(coordinates) {

        if(typeof coordinates === 'undefined')
            return this._coordinates;

        this._coordinates = coordinates;

        return this;
    }

    draw() {
        let coordinates = this.coordinates(),
            begin = coordinates[0];

        this.ctx().moveTo(begin[0], begin[1]);

        this.ctx().bezierCurveTo(
            coordinates[1][0], coordinates[1][1],
            coordinates[2][0], coordinates[2][1],
            coordinates[3][0], coordinates[3][1]
        );

        return this;
    }
};

export default bezier;