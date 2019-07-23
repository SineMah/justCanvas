'use strict';

import Form from '../objects/form.js';
import Calc from '../helpers/calc.js';

var circle = class Circle extends Form {

	constructor(ctx) {

        super(ctx);

        this._x = 0;
        this._y = 0;
        this._r = 0;
        this._start = 0;
        this._end = 360;
        this._direction = false;
	}

    r(value) {

        if(typeof value === 'undefined')
            return this._r;

        this._r = value;

        return this;
    }

    start(value) {

        if(typeof value === 'undefined')
            return this._start;

        this._start = value;

        return this;
    }

    end(value) {

        if(typeof value === 'undefined')
            return this._end;

        this._end = value;

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

    direction(value) {

        if(typeof value === 'undefined')
            return this._direction;

        if(typeof value !== 'boolean')
            throw Exception('direction must be boolean.');

        this._direction = value;

        return this;
    }

    draw() {

        this.ctx().arc(
            this.x(), 
            this.y(), 
            this.r(), 
            Calc.degreesToRadians(this.start()), 
            Calc.degreesToRadians(this.end()), 
            this.direction()
        );

        return this;
    }
};

export default circle;