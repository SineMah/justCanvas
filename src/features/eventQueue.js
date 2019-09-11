'use strict';

import Event from './event.js';

var eventQueue = class EventQueue {

    constructor() {

        this._queue = [];
    }

    event(name, data, target) {

        return new Event(name, data, target);
    }

    add(event) {

        this._queue.push(event);

        return this;
    }

    current() {

        return this._queue.shift();
    }
};

export default eventQueue;