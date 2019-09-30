'use strict';

var animation = class Animation {

    constructor() {

        this.fps = 30;
        this.fpsInterval = 1000 / this.fps;
        this.now = Date.now();
        this.startTime = Date.now();
        this.then = 0;
        this.elapsed = 0;
        this.frameCount = 0;
        this.currentFps = 0;
    }

    animate() {
        let canvas = window.justCanvas,
            _this = window.justCanvasAnimation;

        window.eventStore.flush();
        window.shapeStore.flush();

        _this.now = Date.now();
        _this.elapsed = _this.now - _this.then;

        window.justCanvasHandle = requestAnimationFrame(window.justCanvasAnimate);

        if (_this.elapsed > _this.fpsInterval) {

            _this.then = _this.now - (_this.elapsed % _this.fpsInterval);

            canvas.draw().ctx().clearRect(0, 0, _this._width, _this._height);

            window.justCanvasCallback(canvas, _this.currentFps, window.justCanvasFrameSecond);

            window.justCanvasStep++;

            if(window.justCanvasStep % 60 === 0) window.justCanvasFrameSecond++;

            let sinceStart = _this.now - _this.startTime;

            _this.currentFps = Math.round(1000 / (sinceStart / ++_this.frameCount) * 100) / 100;
        }

        return this;
    }

    stop() {
        let _this = window.justCanvas;

        window.animationStore.delete(_this._id);

        cancelAnimationFrame(window.justCanvasHandle);

        return this;
    }

    reset() {

        window.justCanvasStep = 0;
        window.justCanvasFrameSecond = 0;

        return this;
    }

    refreshRate(fps) {

        if(fps) {

            this.fps = fps;

            this.interval();
        }

        return this;
    }

    interval() {

        this.fpsInterval = 1000 / this.fps;

        return this;
    }

    setup(canvas, callback) {

        window.justCanvasStep = 0; // default are 60 frames per second
        window.justCanvasFrameSecond = 0;
        window.justCanvas = canvas;
        window.justCanvasDraw = canvas.draw;
        window.justCanvasAnimate = this.animate;
        window.justCanvasAnimation = this;
        window.justCanvasCallback = callback;

        return this;
    }
};

export default new animation();