'use strict';

import Form from '../objects/form.js';

var pic = class Pic extends Form {

    constructor(ctx, image, x, y) {

        super(ctx);

        if(typeof x === 'undefined') {

            x = 0;
        }

        if(typeof y === 'undefined') {

            y = 0;
        }

        this._x = x;
        this._y = y;
        this._image = image;
    }

    x() {

        return this._x;
    }

    y() {

        return this._y;
    }

    image() {

        return this._image;
    }

    draw(scale = true) {
        let width = this.ctx().canvas.width,
            height = this.ctx().canvas.height;

        if(scale === false) {

            width = this.image().width;
            height = this.image().height;
        }

        this.ctx().drawImage(
            this.image(),
            this.x(), this.y(), //offset
            this._image.width, this._image.height, //image dimension
            this.x(), this.y(), //offset
            width, height
        );

        return this;
    }

    drawZoom(zoomFactor, x, y) {
        let factor = 1 / zoomFactor;

        this.ctx().drawImage(
            this.image(),
            x, y, //offset
            factor * this._image.width, factor * this._image.height, //image dimension
            this.x(), this.y(), //offset
            this.ctx().canvas.width, this.ctx().canvas.height
        );

        return this;
    }
};

export default pic;