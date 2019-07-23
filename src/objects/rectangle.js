'use strict';

import Form from '../objects/form.js';

var rectangle = class Rectangle extends Form {

	constructor(ctx) {

        super(ctx);

        this._x = 0;
        this._y = 0;
        this._height = 0;
        this._width = 0;
	}

    coordinates(startX, startY) {

        if(typeof coordinates === 'undefined')
            return this._coordinates;

        this._coordinates = coordinates;

        return this;
    }

    width(value) {

        if(typeof value === 'undefined')
            return this._width;

        this._width = value;

        return this;
    }

    height(value) {

        if(typeof value === 'undefined')
            return this._height;

        this._height = value;

        return this;
    }

    x(value) {

        if(typeof value === 'undefined')
            return this._x;

        this._x = value;

        return this;
    }

    y(value) {

        if(typeof value === 'undefined')
            return this._y;

        this._y = value;

        return this;
    }

    draw() {

        this.ctx().fillStyle = this.color();

        this.ctx().fillRect(this.x(), this.y(), this.width(), this.height());

        return this;
    }
};

export default rectangle;