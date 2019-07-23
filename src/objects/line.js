'use strict';

import Form from '../objects/form.js';

var line = class Line extends Form {

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

        for(let i in coordinates) {
            let coordinate = coordinates[i],
                x = coordinate[0],
                y = coordinate[1];

            this.ctx().lineTo(x, y);
        }

        return this;
    }
};

export default line;