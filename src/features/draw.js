'use strict';

import Line from '../objects/line.js';
import Bezier from '../objects/bezier.js';
import Circle from '../objects/circle.js';
import Rectangle from '../objects/rectangle.js';
import Pic from '../objects/pic.js';
//
import Events from '../helpers/events.js';

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

        if(typeof value === 'undefined')
            return this._current;

        this._current = value;

        return this;
    }

    close() {

        this.ctx().closePath();

        return this;
    }

    on(eventName, callback) {
        let id = this.current().id();

        if(typeof window.justCanvasElements[id].events === 'undefined') {

            window.justCanvasElements[id].events = [];
        }

        window.justCanvasElements[id].events.push(eventName);

        if(typeof window.justCanvasCallbacks[id] === 'undefined') {

            window.justCanvasCallbacks[id] = {};
        }

        window.justCanvasCallbacks[id][eventName] = callback;

        Events.init(eventName, id);

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
            .draw();

        this.current(line);
        this.add(line);

        return this;
    }

    bezier(coordinates) {
        let bezier = new Bezier(this.ctx());

        bezier
            .coordinates(coordinates)
            .color(this.color())
            .draw();

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
            .draw();

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
            .draw();

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

        image.draw(scale);

        this.current(image);
        this.add(image);

        return this;
    }

    imagePointer(img, x, y) {
        let image = new Pic(this.ctx(), img);

        image.offset(x, y);

        image.draw(false, true);

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

        image.drawZoom(zoomFactor, x, y);

        this.current(image);
        this.add(image);

        return this;
    }

    collection() {

        return this._collection;
    }
};

export default Draw;