'use strict';

import Context from "../factories/context.js";

var Store = class Store {

    constructor() {

        window.justCanvasContexts = {};
    }

    static create(id) {
        let context = new Context();

        context.init(id);

        window.justCanvasContexts[id] = context;

        return this;
    }

    /**
     * Create a point.
     * @return {Context}
     */
    static get(id) {
        let localContext = null;

        if(window.justCanvasContexts[id]) {

            localContext = window.justCanvasContexts[id];
        }

        return localContext;
    }
};

export default Store;