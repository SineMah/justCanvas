'use strict';

var animation = class Animation {

    animate() {
        let _this = window.justCanvas;

        window.eventStore.flush();
        window.shapeStore.flush();

        window.justCanvasHandle = requestAnimationFrame(window.justCanvasAnimate);

        _this.draw().ctx().clearRect(0, 0, _this._width, _this._height);

        window.justCanvasCallback(_this, window.justCanvasStep, window.justCanvasFrameSecond);

        window.justCanvasStep++;

        if(window.justCanvasStep % 60 === 0) window.justCanvasFrameSecond++;

        return this;
    }

    stop() {

        cancelAnimationFrame(window.justCanvasHandle);

        return this;
    }

    reset() {

        window.justCanvasStep = 0;
        window.justCanvasFrameSecond = 0;

        return this;
    }

    setup(canvas, callback) {

        window.justCanvasStep = 0; // default are 60 frames per second
        window.justCanvasFrameSecond = 0;
        window.justCanvas = canvas;
        window.justCanvasAnimate = this.animate;
        window.justCanvasCallback = callback;

        return this;
    }
};

export default new animation();