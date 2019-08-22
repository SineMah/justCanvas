'use strict';

import Line from '../objects/line.js';
import Bezier from '../objects/bezier.js';
import Circle from '../objects/circle.js';
import Rectangle from '../objects/rectangle.js';
import Pic from '../objects/pic.js';
import Text from '../objects/text.js';

import Event from "../helpers/event.js";

var Draw = class Draw {

    constructor(id) {

        this._canvas = null;
        this._ctx = null;
        this._color = '#000000';

        this.canvas(id);
        this.ctx(true);

        this._current = null;
        this._collection = {};
    }

    canvas(id) {

        if(typeof id === 'undefined')
            return this._canvas;

        this._canvas = document.getElementById(id);
        this._ctx = this._canvas.getContext('2d');

        return this;
    }

    color(value) {

        if(typeof value === 'undefined')
            return this._color;

        this._color = value;

        return this;
    }

    ctx() {

        return this._ctx;
    }

    begin()  {

        this.ctx().beginPath();

        return this;
    }

    current(value) {

        if(typeof value === 'undefined') {

            return this._current;
        }

        this._current = value;

        return this;
    }

    close() {

        this.ctx().closePath();

        return this;
    }

    on(eventName, callback) {
        let e = new Event(this._current._id, eventName, callback);

        e.shape = this._current;
        e.canvas = this._ctx.canvas.id;

        if(!window.eventStore.exists(e)) {
            // console.log(e);

            /**
             * var EventStore window.eventStore
             */
            window.eventStore.add(e);
        }

        return this;
    }

    hover(cursor, callback, config) {
        let e = new Event(this._current._id, 'mousemove', callback);

        e.shape = this._current;
        e.canvas = this._ctx.canvas.id;
        e.custom = 'hover';

        if(typeof cursor === 'undefined') {

            cursor = 'pointer';
        }

        e.cursor = cursor;
        e.threeSixty = config;

        /**
         * var EventStore window.eventStore
         */
        window.eventStore.add(e);

        return this;
    }

    fill() {

        this.current().fill();

        return this;
    }

    stroke() {

        this.current().stroke();

        return this;
    }

    add(formObject) {

        this._collection[formObject.id()] = formObject;

        return this;
    }

    line(coordinates) {
        let line = new Line(this.ctx());

        line
            .coordinates(coordinates)
            .color(this.color())
            .setId()
            .draw();

        line = this.addShape(line);

        this.current(line);
        this.add(line);

        return this;
    }

    bezier(coordinates) {
        let bezier = new Bezier(this.ctx());

        bezier
            .coordinates(coordinates)
            .color(this.color())
            .setId()
            .draw();

        bezier = this.addShape(bezier);

        this.current(bezier);
        this.add(bezier);

        return this;
    }

    rectangle(startX, startY, width, height) {
        let rectangle = new Rectangle(this.ctx());

        rectangle
            .x(startX)
            .y(startY)
            .width(width)
            .height(height)
            .color(this.color())
            .setId()
            .draw();

        rectangle = this.addShape(rectangle);

        this.current(rectangle);
        this.add(rectangle);

        return this;
    }

    circle(x, y, r, startAngle, endAngle, direction) {
        let circle = new Circle(this.ctx());

        if(typeof startAngle === 'undefined')
            startAngle = 0;

        if(typeof endAngle === 'undefined')
            endAngle = 360;

        if(typeof direction === 'undefined')
            direction = false;

        circle
            .x(x)
            .y(y)
            .r(r)
            .start(startAngle)
            .end(endAngle)
            .direction(direction)
            .color(this.color())
            .setId()
            .draw();

        circle = this.addShape(circle);

        this.current(circle);
        this.add(circle);

        return this;
    }

    image(img, scale, x, y) {

        if(typeof x === 'undefined') {

            x = 0;
        }

        if(typeof y === 'undefined') {

            y = 0;
        }

        if(typeof scale === 'undefined') {

            scale = true;
        }

        let image = new Pic(this.ctx(), img, x, y);

        image.setId();

        image.draw(scale);

        image = this.addShape(image);

        this.current(image);
        this.add(image);


        return this;
    }

    imagePointer(img, x, y) {
        let image = new Pic(this.ctx(), img);

        image.offset(x, y);

        image.setId();

        image.draw(false, true);

        image = this.addShape(image);

        this.current(image);
        this.add(image);


        return this;
    }

    imageZoom(img, zoomFactor, x, y) {

        if(typeof x === 'undefined')
            x = 0;

        if(typeof y === 'undefined')
            y = 0;

        let image = new Pic(this.ctx(), img);

        image.setId();

        image.drawZoom(zoomFactor, x, y);

        this.current(image);
        this.add(image);

        return this;
    }

    text(charArray, x, y, color, size, font) {
        let text = new Text(this.ctx(), charArray);

        if(typeof x === 'undefined') {

            x = 0;
        }

        if(typeof y === 'undefined') {

            y = 0;
        }

        text
            .x(x)
            .y(y);

        if(typeof color !== 'undefined') {

            text.color(color);
        }

        if(typeof size !== 'undefined') {

            text.size(size);
        }


        if(typeof font !== 'undefined') {

            text.font(font);
        }

        text.draw();

        return this;
    }

    textBox(charArray, x, y, textConfig, boxConfig) {
        let padding = {
                x: 0,
                y: 0
            },
            metrics = this.textMetrics(charArray, textConfig.font, textConfig.size);

        if(typeof textConfig === 'undefined') {

            textConfig = {};
        }

        if(boxConfig.padding) {

            if(boxConfig.padding.x) {

                padding.x = boxConfig.padding.x;
            }

            if(boxConfig.padding.y) {

                padding.y = boxConfig.padding.y;
            }
        }

        this
            .begin()
            .color(boxConfig.color)
            .rectangle(
                x,
                y,
                metrics.width + 2*padding.x,
                metrics.height + 2*padding.y
            )
            .close();

        this.text(charArray, x + padding.x, y + textConfig.size + 0*padding.y, textConfig.color, textConfig.size, textConfig.font);

        return this;
    }

    collection() {

        return this._collection;
    }

    addShape(shape) {

        /**
         * var ShapeStore window.shapeStore
         */
        let existingShape = window.shapeStore.exists(shape);

        if(existingShape) {

            shape._id = existingShape._id;
        }else {

            window.shapeStore.add(this._current);
        }

        return shape;
    }

    textMetrics(text, font, size) {
        let canvas = this.textMetrics.canvas || (this.textMetrics.canvas = document.createElement("canvas")),
            context = canvas.getContext('2d');

        canvas.classList.add('d-none');

        context.font = `${size}px ${font}`;

        let metrics = context.measureText(text);

        return {
            width: metrics.width,
            height: size
        }
    }
};

export default Draw;