'use strict';

import Form from '../objects/form.js';

var text = class Text extends Form {

    constructor(id, text) {

        super(id);

        this._x = 0;
        this._y = 0;
        this._text = text;

        this._font = 'Arial';
        this._size = '30px';

        this._width = 0;
        this._height = 0;

    }

    coordinates(x, y) {

        this
            .x(x)
            .y(y);

        return this;
    }

    size(value) {

        if(typeof value === 'undefined')
            return this._size;

        this._size = `${value}px`;

        return this;
    }

    font(value) {

        if(typeof value === 'undefined')
            return this._font;

        this._font = value;

        return this;
    }

    width(value) {

        if(typeof value === 'undefined')
            return this._width;

        this._width = value;

        return this;
    }

    height(value) {

        if(typeof value === 'undefined')
            return this._height;

        this._height = value;

        return this;
    }

    x(value) {

        if(typeof value === 'undefined')
            return this._x;

        this._x = value;

        return this;
    }

    y(value) {

        if(typeof value === 'undefined')
            return this._y;

        this._y = value;

        return this;
    }

    draw() {

        this.ctx().fillStyle = this.color();
        this.ctx().font = `${this.size()} ${this.font()}`;

        this.ctx().fillText(this._text, this.x(), this.y());

        return this;
    }

    inShape(position) {
        let inShape = false;

        return inShape;
    }
};

export default text;