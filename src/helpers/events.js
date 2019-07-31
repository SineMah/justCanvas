'use strict';

var events = class Events {

    constructor() {

        this._events = {
            'click': 'click',
            'mouseover': 'mousemove'
        };

        this._added = 2;
        this._add = 1;
        this._notAdded = 0;

        if(typeof window.justCanvasAdded === 'undefined')
            window.justCanvasAdded = {};

    }

    init(eventType, id) {

        if(this.event(eventType))
            this
                .add(this.event(eventType), id);

        return this;
    }

    add(type, id) {

        if(typeof window.justCanvasAdded[type] === 'undefined') {

            window.justCanvasAdded[type] = [];



            this.register(type);
        }

        window.justCanvasAdded[type].push(id);

        return this;
    }

    register(type) {

        window.addEventListener(type, (e) => {

            if(typeof window.justCanvasAdded[type] === 'undefined')
                return false;

            window.justCanvasAdded[type].forEach((id, index) => {
                let callback = window.justCanvasCallbacks[id][type],
                    obj = window.justCanvasElements[id];

                if(obj.inForm(e.x, e.y))
                    callback(obj, type, id);

            });
        });
    }

    event(type) {

        if(typeof this._events[type] !== 'undefined')
            return this._events[type];

        return false;
    }
};

export default new events();