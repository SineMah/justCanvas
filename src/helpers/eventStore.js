'use strict';

import Dom from '../helpers/Dom.js';

var eventStore = class EventStore {

    constructor() {

        this._events = {};
        this._dom = new Dom();

        this._eventNames = [
            'click'
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

        this._eventNames.forEach((eventName) => {

            window.addEventListener(eventName, (e) => this.find(e))
        });
    }

    find(e) {

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

                    event.callback(e, event);
                }
            }
        }
    }
};

export default eventStore;