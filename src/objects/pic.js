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

        this._offset = [0, 0];
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

    offset(x, y) {

        this._offset = [x, y];

        return this;
    }

    draw(scale, offset) {
        let width = this.ctx().canvas.width,
            height = this.ctx().canvas.height,
            position = [this.x(), this.y()];

        if(typeof scale === 'undefined') {

            scale = true;
        }

        if(scale === false) {

            width = this.image().width;
            height = this.image().height;
        }

        if(offset) {

            position = this._offset;
        }

        this.ctx().drawImage(
            this.image(),
            this.x(), this.y(), //offset
            this._image.width, this._image.height, //image dimension
            position[0], position[1], //offset
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