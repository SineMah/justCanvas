'use strict';

import String from '../helpers/string.js';
import Draw from '../features/draw.js';
import Animation from '../helpers/animation.js';
import EventStore from '../helpers/eventStore.js';
import ShapeStore from '../helpers/shapeStore.js';
import AnimationStore from '../helpers/animationStore.js';
import EventQueue from '../features/eventQueue.js';

var Canvas = class Canvas {

    constructor(ctx) {

        this._id = `jC-${String.getId()}`;
        this._class = 'jC';
        this._width = 300;
        this._height = 300;
        this._style = null;
        this._draw = null;

        this._events = null;

        // initialize eventStore
        if(typeof window.eventStore !== 'object') {

            window.eventStore = new EventStore();
        }
        // initialize shapeStore
        if(typeof window.shapeStore !== 'object') {

            window.shapeStore = new ShapeStore();
        }
        // initialize animationStore
        if(typeof window.animationStore !== 'object') {

            window.animationStore = new AnimationStore();
        }

        window.eventStore.toggle();
    }

    id(value) {

        if(typeof value === 'undefined') {

            return this._id;
        }

        this._id = value;

        return this;
    }

    class(value) {

        if(typeof value === 'undefined') {

            return this._class;
        }

        this._class = value;

        return this;
    }

    width(value) {

        if(typeof value === 'undefined') {

            return this._width;
        }

        this._width = value;

        return this;
    }

    height(value) {

        if(typeof value === 'undefined') {

            return this._height;
        }

        this._height = value;

        return this;
    }

    style(value) {

        if(typeof value === 'undefined') {

            return this._style;
        }

        this._style = value;

        return this;
    }

    getHtml() {

        return `<canvas id="${this.id()}" class="${this.class()}" width="${this.width()}" height="${this.height()}"></canvas>`;
    }

    resize(height, width) {
        let canvas = document.getElementById(this.id());

        if(typeof height !== 'undefined') {
            this.height(height);
            canvas.height = height;
        }

        if(typeof width !== 'undefined') {
            this.width(width);
            canvas.width = width;
        }

        this._draw._width = this._width;
        this._draw._height = this._height;

        return this;
    }

    draw() {

        if(this._draw === null) {

            this._draw = new Draw(this.id(), this);
        }

        return this._draw;
    }

    animate(callback) {

        Animation
            .setup(this, callback)
            .animate();

        return this;
    }

    stop() {

        Animation.stop();

        return this;
    }

    collection () {

        return this.draw().collection();
    }

    events() {

        if(!this._events) {

            this._events = new EventQueue();
        }

        return this._events;
    }
};

export default Canvas;