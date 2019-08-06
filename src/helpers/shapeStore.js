'use strict';

var shapeStore = class ShapeStore {

    constructor() {

        this._shapes = {};

        this._shapeProperties = {};
    }

    add(shape) {

        // if(!this._shapes[shape._id]) {

        this._shapes[shape._id] = shape;
        this._shapeProperties[this.serialize(shape)] = shape._id;

        // }

        return this;
    }

    exists(shape) {
        let shapeExists = false;

        if(typeof this._shapes[shape._id] !== 'undefined') {

            shapeExists = this._shapes[shape._id];
        }

        if(typeof this._shapeProperties[this.serialize(shape)] !== 'undefined') {
            let id = this._shapeProperties[this.serialize(shape)];

            shapeExists = this._shapes[id];
        }

        return shapeExists;
    }

    serialize(shape) {
        let color = shape._color || 'null',
            x = shape._x || 'null',
            y = shape._y || 'null',
            r = shape._r || 'null',
            i = typeof shape._image === 'undefined' ? '0' : '1';

        if(typeof shape._offset !== 'undefined') {

            x = shape._offset[0];
            y = shape._offset[1];
        }

        return `id-x:${Number(x).toFixed(2)}-y:${Number(y).toFixed(2)}-r:${r}-c${color}-i:${i}`;
    }
};

export default shapeStore;