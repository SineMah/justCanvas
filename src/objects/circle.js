'use strict';

import Form from '../objects/form.js';
import Calc from '../helpers/calc.js';

var circle = class Circle extends Form {

    constructor(ctx, overlay) {

        super(ctx);

        this._x = 0;
        this._y = 0;
        this._r = 0;
        this._start = 0;
        this._end = 360;
        this._direction = false;

        this._overlay = overlay || false;
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

    overlay(mode) {
        let operation = this.overlayMode(mode || this._overlay);

        if(operation) {

            this.ctx().globalCompositeOperation = operation;
        }

        return this;
    }

    inShape(position) {
        let inShape = false,
            distance = Math.sqrt(Math.pow(position.left - this._x, 2) + Math.pow(position.top - this._y, 2));

        if(distance <= this._r) {

            inShape = true;
        }

        return inShape;
    }
};

export default circle;