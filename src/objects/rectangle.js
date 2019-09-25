'use strict';

import Form from '../objects/form.js';

var rectangle = class Rectangle extends Form {

    constructor(ctx, overlay) {

        super(ctx);

        this._x = 0;
        this._y = 0;
        this._height = 0;
        this._width = 0;

        this._overlay = overlay || false;
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

        this.overlay();

        this.ctx().fillStyle = this.color();

        this.ctx().fillRect(this.x(), this.y(), this.width(), this.height());


        return this;
    }

    overlay(mode) {
        // let operation = this.overlayMode(mode || this._overlay);
        let operation = mode || this._overlay;

        if(operation) {

            this.ctx().globalCompositeOperation = operation;
        }

        return this;
    }

    inShape(position) {
        let inShape = false;

        if(position.top >= this._y && position.top <= this._y + this._height &&
            position.left >= this._x && position.left <= this._x + this._width) {

            inShape = true
        }

        return inShape;
    }
};

export default rectangle;