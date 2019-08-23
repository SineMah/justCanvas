'use strict';

import Dom from '../helpers/Dom.js';

var eventStore = class EventStore {

    constructor() {

        this._events = {};
        this._dom = new Dom();

        // global count for cursor
        this._eventCount = {
            hover: 0,
            wasHover: 99
        };

        this._lastEvent = null;

        // global hover
        this._eventSingle = {};

        this._eventNames = [
            'click',
            'mousemove'
        ];
    }

    add(event) {


        if(!this.exists(event)) {

            /**
             * var Event event
             */
            this._events[event.id] = event;

            if(event.custom === 'hover') {

                this._eventSingle[event.id] = false;
            }
        }

        return this;
    }

    exists(event) {
        let found = false;

        if(this._events[event.id]) {

            found = true;
        }

        return found;
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

                this.resetMove(e, event);

                if(event.shape.inShape(e.elementPosition)) {

                    this._eventCount.wasHover = 0;

                    this.executeCustom(e, event);

                    if(typeof event.callback === 'function' && !event.custom) {

                        event.callback(e, event);
                    }
                }

                if(this._eventCount.hover > 0) {
                    let cursor = event.cursor || 'auto';

                    this._lastEvent = event;

                    document.querySelector(`#${event.canvas}`).style.cursor = cursor;
                }else {

                    if(this._eventCount.wasHover > 0) {
                        let e = new CustomEvent('jC-mouseLeave', {
                            origEvent: this._lastEvent
                        });

                        this._eventCount.wasHover = 0;

                        document.querySelector(`#${event.canvas}`).dispatchEvent(e);
                    }

                    document.querySelector(`#${event.canvas}`).style.cursor = 'auto';
                }
            }
        }
    }

    executeCustom(e, event) {

        switch (event.custom) {

            case 'hover':
                this._eventCount.hover++;
                this._eventCount.wasHover++;
                break;
        }

        if(typeof this._eventSingle[event.id] === 'boolean'
            && this._eventSingle[event.id] === false
            && typeof event.callback === 'function') {

            event.callback(e, event);

            this._eventSingle[event.id] = true;
        }

        return this;
    }

    resetMove(e, event) {

        if(typeof this._eventSingle[event.id] === 'boolean'
            && this._eventSingle[event.id] === true
            && !event.shape.inShape(e.elementPosition)) {

            this._eventSingle[event.id] = false;
        }

        return this;
    }

    flush() {

        window.eventStore._events = {};
        window.eventStore._eventSingle = {};

        return this;
    }
};

export default eventStore;