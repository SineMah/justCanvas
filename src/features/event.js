'use strict';

var event = class Event {

    constructor(name, data, target) {
        let el = document,
            information = {};

        if(typeof target !== 'undefined') {

            el = document.querySelector(target);
        }

        if(typeof information !== 'undefined') {

            information = data;
        }

        this._el = el;
        this._name = name;
        this._information = information;
    }

    send(queue) {
        let event = new CustomEvent(this._name);

        // atm browsers don't got enabled spread syntax ;(
        for(let attr in this._information) {

            if(this._information.hasOwnProperty(attr)) {

                event[attr] = this._information[attr];
            }
        }

        if(queue) {

            event.queue = queue;
        }

        this._el.dispatchEvent(event);

        return this;
    }
};

export default event;