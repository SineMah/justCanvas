'use strict';

import String from '../helpers/string.js';

var form = class Form {

    constructor(ctx) {

        this._ctx = ctx;
        this._id = String.getId();
        this._color = '#000000';
    }

    ctx(value) {

        if(typeof value === 'undefined')
            return this._ctx;

        this._ctx = value;

        return this;
    }

    id(value) {

        if(typeof value === 'undefined')
            return this._id;

        this._id = value;

        return this;
    }

    color(value) {

        if(typeof value === 'undefined')
            return this._color;

        this._color = value;

        return this;
    }

    fill() {

        this.ctx().fillStyle = this.color();
        this.ctx().fill();

        return this;
    }

    stroke() {

        this.ctx().strokeStyle = this.color();
        this.ctx().stroke();

        return this;
    }

    inShape() {

        return false;
    }

    setId() {

        this._id = this.serialize();

        return this;
    }

    serialize() {
        let color = this._color || 'null',
            x = this._x || 'null',
            y = this._y || 'null',
            r = this._r || 'null',
            i = typeof this._image === 'undefined' ? '0' : '1';

        if(typeof this._offset !== 'undefined') {

            x = this._offset[0];
            y = this._offset[1];
        }

        return `id-${this._ctx.canvas.id}-x:${Number(x).toFixed(2)}-y:${Number(y).toFixed(2)}-r:${r}-c${color}-i:${i}`;
    }

    overlayMode(mode) {
        let composite = false;

        switch (mode) {
            case 'over':
                composite = 'source-over';
                break;
            case 'destination':
                composite = 'destination-out';
                break;
        }

        return composite;
    }
};

export default form;