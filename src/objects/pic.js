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

        this._height = 0;
        this._width = 0;

        this._image = image;

        this._position = [0, 0];

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

        this._position = position;
        this._height = this._image.height;
        this._width = this._image.width;

        if(window.jCDebug) {

            this.ctx().beginPath();
            this.ctx().arc(position[0], position[1], 5, 0, 2 * Math.PI);
            this.ctx().fillStyle = 'red';
            this.ctx().fill();

            this.ctx().beginPath();
            this.ctx().arc(position[0] + this._width, position[1] + this._height, 5, 0, 2 * Math.PI);
            this.ctx().fillStyle = 'red';
            this.ctx().fill();

            this.ctx().beginPath();
            this.ctx().arc(0, 0, 20, 0, 2 * Math.PI);
            this.ctx().fillStyle = 'lightblue';
            this.ctx().fill();

            this.ctx().beginPath();
            this.ctx().arc(750, 500, 20, 0, 2 * Math.PI);
            this.ctx().fillStyle = 'lightblue';
            this.ctx().fill();
        }

        return this;
    }

    drawZoom(zoomFactor, x, y) {
        let factor = 1 / zoomFactor,
            _factor = (1 - factor);


        this.ctx().drawImage(
            this.image(),
            // x, y, //offset
            _factor*this._image.width/2, _factor*this._image.height/2, //offset orig image
            factor * this._image.width, factor * this._image.height, //image dimension
            this.x(), this.y(), //offset
            this.ctx().canvas.width, this.ctx().canvas.height
        );

        return this;
    }

    inShape(position) {
        let x = this._position[0],
            y = this._position[1],
            canvas = document.getElementById(this.ctx().canvas.id),
            _x  = this._ctx.canvas.width/canvas.clientWidth,
            _y  = this._ctx.canvas.height/canvas.clientHeight,
            inShape = false;

        position.left = _x * position.left;
        position.top = _y * position.top;

        if(position.top >= y && position.top <= y + this._height &&
            position.left >= x && position.left <= x + this._width) {

            inShape = true
        }

        if(window.jCDebug) {

            this.ctx().beginPath();
            this.ctx().arc(position.left, position.top, 2, 0, 2 * Math.PI);
            this.ctx().fillStyle = 'lightgreen';
            this.ctx().fill();
            this.ctx().closePath();

            this.ctx().beginPath();
            this.ctx().fillStyle = 'white';
            this.ctx().fillRect(0, 0, 200, 45);
            this.ctx().fill();
            this.ctx().closePath();

            this.ctx().beginPath();
            this.ctx().fillStyle = 'lightgreen';
            this.ctx().font = "30px Arial";
            this.ctx().fillText(`x: ${Number(position.left).toFixed()}, y: ${Number(position.top).toFixed()}`, 5, 35);
            this.ctx().closePath();
        }

        return inShape;
    }
};

export default pic;