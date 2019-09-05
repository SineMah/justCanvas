'use strict';

import Dom from '../helpers/Dom.js';

var eventStore = class EventStore {

    constructor() {

        this._events = {};
        this._dom = new Dom();

        // global count for cursor
        this._eventCount = {
            hover: 0,
            wasHover: 0
        };

        this._eventTriggered = {};

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
        let inShapes = [];
        this._eventCount.hover = 0;

        for(let eId in window.eventStore._events) {
            let event = window.eventStore._events[eId];

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

                let isInShape = event.shape.inShape(e.elementPosition);

                this.resetMove(e, event, isInShape);

                if(isInShape) {

                    this._eventCount.wasHover = 0;

                    inShapes.push(event);

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

        if(inShapes.length === 0) {
            let e = new CustomEvent('jC-mouseLeave', {
                origEvent: this._lastEvent
            });

            for(let key in window.eventStore._eventTriggered) {
                let triggered = window.eventStore._eventTriggered[key];

                if(triggered) {

                    document.querySelector(`#${triggered.canvas}`).dispatchEvent(e);
                }
            }

            window.eventStore._eventTriggered = {};
        }
    }

    executeCustom(e, event) {

        switch (event.custom) {

            case 'hover':
                this._eventCount.hover++;
                this.setTriggered(event);
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

    resetMove(e, event, isInShape) {

        if(typeof this._eventSingle[event.id] === 'boolean'
            && this._eventSingle[event.id] === true
            && !isInShape) {

            this._eventSingle[event.id] = false;
        }

        return this;
    }

    setTriggered(event) {

        window.eventStore._eventTriggered[event.id] = event;

        return this;
    }

    isTriggered(eventId) {

        return eventId  in window.eventStore._eventTriggered;
    }

    removeTriggered(eventId) {

        delete(window.eventStore._eventTriggered[eventId]);

        return this;
    }

    flush() {

        // todo flush just events from current canvas

        window.eventStore._events = {};
        window.eventStore._eventSingle = {};
        window.eventStore._eventTriggered = {};

        return this;
    }
};

export default eventStore;