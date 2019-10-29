'use strict';

var Context = class Context {

    constructor() {

        this._context = null;
        this._canvas = null;
        this._id = null;
    }

    init(id) {

        this._id = id;
        this._canvas = document.getElementById(this._id);

        this._context = this._canvas.getContext('2d');

        this.extendContext();
        this.injectPosition();

        this._context.translatePosition = {
            x: this._canvas.width/2,
            y: this._canvas.height/2
        };
    }

    context() {

        return this._context;
    }

    // alias to context
    ctx() {

        return this.context();
    }

    id() {

        return this._id;
    }

    canvas() {

        return this._canvas;
    }

    draw() {

        return this._draw;
    }

    extendContext() {
        let context = this._context;

        context._zoom = 1;
        context._center = [];
        context._translation = [];
        context._zoomPoint = [];
        context._offset = [];
        context._useCenter = false;
        context._matrix = [1, 0, 0,
            1, 0, 0];
        context._matrixSaved = [1, 0, 0,
            1, 0, 0];

        context.point = (x, y) => {
            let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg'),
                point = svg.createSVGPoint();

            // console.log(x, y);
            // console.trace();

            point.x = x;
            point.y = y;

            return point;
        };

        context.setZoomPoint = (zoom) => {

            context._zoomPoint.push(zoom);

            return this;
        };

        context.zoomDirection = () => {
            let direction = 0;

            if(context._zoomPoint.length > 1) {
                let last = context._zoomPoint[context._zoomPoint.length - 1],
                    secondToLast = context._zoomPoint[context._zoomPoint.length - 2];

                if(last > secondToLast) {

                    direction = 1;
                }else if(last < secondToLast) {

                    direction = -1;
                }
            }

            return direction;
        };

        context.setCenter = (point) => {

            context._center.push(point);

            return this;
        };

        context.setOffset = (point) => {

            context._offset.push(point);

            return this;
        };

        context.setCenterPoint = (x, y) => {
            let point = context.point(x, y);

            context.setCenter(point);

            return this;
        };

        context.setOffsetPoint = (x, y) => {
            let point = context.point(x, y);

            context.setOffset(point);

            return this;
        };

        context.setTranslationPoint = (x, y) => {
            let point = context.point(x, y);

            context._translation.push(point);

            return this;
        };

        context.setZoom = (zoom) => {

            context._zoom = zoom;

            return this;
        };

        context.drawImageZoom = (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
            let point = context.getLastCenter(),
                offset = context.getLastOffset(),
                xMoved = point.x - this._canvas.width/2,
                yMoved = point.y - this._canvas.height/2;

            context.save();

            if(context._zoom > 1) {

                context.translate(offset.x - xMoved, offset.y - yMoved);
            }else {

                context.translate(0, 0);
            }

            context.scale(context._zoom, context._zoom);
            context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            context.restore();

            return this;
        };

        context._getMousePosition = (evt) => {
            let rect = this._canvas.getBoundingClientRect();

            return {
                left: evt.clientX - rect.left,
                top: evt.clientY - rect.top
            };
        };

        context.dimension = (width, height) => {

            this._canvas.width = width;
            this._canvas.height = height;

            this._context.translatePosition = {
                x: this._canvas.width/2,
                y: this._canvas.height/2
            };

            return this;
        };

        context.getLastOffset = () => {

            return context._offset[context._offset.length - 1] || context.point(0, 0);
        };

        context.getLastCenter = () => {

            return context._center[context._center.length - 1] || context.point(0, 0);
        };

        context.getLastTranslation = () => {

            return context._translation[context._translation.length - 1] || context.point(0, 0);
        };

        context.center = (useCenter) => {

            context._useCenter = !!useCenter;

            return this;
        };

        context.useCenter = () => {

            return context._useCenter;
        };


        context.flushOffset = () => {

            context._offset = [];

            return this;
        };

        context.flushCenter = () => {

            context._center = [];

            return this;
        };

        context.scaleCustom = (x, y) => {

            context._matrix[0] *= x;
            context._matrix[1] *= x;
            context._matrix[2] *= y;
            context._matrix[3] *= y;

            context.scale(x,y);

            return this;
        };

        context.translateCustom = (x, y) => {

            context._matrix[5] += context._matrix[1]*x + context._matrix[3]*y;
            context._matrix[4] += context._matrix[0]*x + context._matrix[2]*y;

            context.translate(x, y);

            return this;
        };

        context.convertCoordinates = (x, y) => {
            let _x = context._matrix[0]*x + context._matrix[2]*y + context._matrix[4],
                _y = context._matrix[1]*x + context._matrix[3]*y + context._matrix[5],
                point = context.point(_x, _y);

            return point;
        };

        context.saveCustom = () => {

            // context._matrixSaved = context._matrix;

            context.save();

            return this;
        };

        context.restoreCustom = () => {

            // context._matrix = context._matrixSaved;
            context._matrix = [1, 0, 0,
                                1, 0, 0];

            context.restore();

            return this;
        };

        this._context = context;
    }

    injectPosition() {
        let context = this._context;

        context._getPosition = () => {
            let box = this._canvas.getBoundingClientRect(),
                body = document.body,
                docEl = document.documentElement,
                // scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
                // scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
                clientTop = docEl.clientTop || body.clientTop || 0,
                clientLeft = docEl.clientLeft || body.clientLeft || 0,
                // top  = box.top +  scrollTop - clientTop,
                top  = box.top - clientTop,
                // left = box.left + scrollLeft - clientLeft;
                left = box.left- clientLeft;


            context.elementTop = Math.round(top);
            context.elementLeft = Math.round(left);

            return this;
        };

        context._getPosition();

        context.mousePosition = {
            top: 0,
            left: 0
        };

        document.getElementById(this._id).addEventListener('mousemove', (e) => {

            context.mousePosition = {
                top: (e.y || e.pageY) - context.elementTop,
                left: (e.x || e.pageX) - context.elementLeft
            };
        });

        document.getElementById(this._id).addEventListener('click', (e) => {

            context.mousePosition = {
                top: (e.y || e.pageY) - context.elementTop,
                left: (e.x || e.pageX) - context.elementLeft
            };
        });

        this._context = context;

        return this;
    }
};

export default Context;