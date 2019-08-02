'use strict';

import Dom from '../helpers/Dom.js';

var eventStore = class EventStore {

    constructor() {

        this._events = {};
        this._dom = new Dom();

        this._eventCount = {
            hover: 0
        };

        this._eventNames = [
            'click',
            'mousemove'
        ];
    }

    add(event) {
        /**
         * var Event event
         */
        this._events[event.id] = event;

        return this;
    }

    toggle() {

        this._eventCount.hover = 0;

        this._eventNames.forEach((eventName) => {

            window.addEventListener(eventName, (e) => this.find(e))
        });
    }

    find(e) {

        this._eventCount.hover = 0;

        for(let eId in this._events) {
            let event = this._events[eId];

            if(event.canvas === e.target.id && event.name === e.type) {
                let pos = this._dom.getPosition(e.target);

                e.relativePosition = {
                    top: pos.top,
                    left: pos.left
                };

                e.elementPosition = {
                    top: (e.y || e.pageY) - pos.top,
                    left: (e.x || e.pageX) - pos.left
                };

                if(event.shape.inShape(e.elementPosition)) {

                    this.executeCustom(event);

                    if(typeof event.callback === 'function') {

                        event.callback(e, event);
                    }
                }

                if(this._eventCount.hover > 0) {
                    let cursor = event.cursor || 'auto';

                    document.querySelector(`#${event.canvas}`).style.cursor = cursor;
                }else {

                    document.querySelector(`#${event.canvas}`).style.cursor = 'auto';
                }
            }
        }
    }

    executeCustom(event) {

        switch (event.custom) {

            case 'hover':
                this._eventCount.hover++;
                break;
        }

        return this;
    }
};

export default eventStore;