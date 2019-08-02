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
};

export default form;