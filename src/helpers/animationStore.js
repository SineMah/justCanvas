'use strict';

var animationStore = class AnimationStore {

    constructor() {

        window._animationStore = {};
    }

    add(id) {


        window._animationStore[id] = true;

        return this;
    }

    active(id) {

        return window._animationStore[id] === true;
    }

    exists(id) {
        let found = false;

        if(window._animationStore[id]) {

            found = true;
        }

        return found;
    }

    delete(id) {

        if(this.exists(id)) {

            window._animationStore[id] = false;
        }

        return this;
    }

    flush() {

        window._animationStore = {};

        return this;
    }
};

export default animationStore;