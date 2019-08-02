'use strict';

var event = class Event {

    constructor(id, name, callback) {

        this.id = `${id}-${name}`;
        this.name = name;
        this.canvas = null;
        this.shape = null;
        this.callback = callback;
    }
};

export default event;