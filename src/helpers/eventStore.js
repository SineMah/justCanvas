'use strict';

var eventStore = class EventStore {

    constructor() {

        this._events = {};

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

                // TODO proof is in shape
                event.callback(e, event);
            }
        }
    }
};

export default eventStore;