'use strict';

var Dom = class Dom {

    getPosition(el) {
        let box = el.getBoundingClientRect(),
            body = document.body,
            docEl = document.documentElement,
            scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
            clientTop = docEl.clientTop || body.clientTop || 0,
            clientLeft = docEl.clientLeft || body.clientLeft || 0,
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return {
            top: Math.round(top),
            left: Math.round(left)
        };
    }

    getMousePosition(canvas, evt) {
        let rect = canvas.getBoundingClientRect();

        return {
            left: evt.clientX - rect.left,
            top: evt.clientY - rect.top
        };
    }
};

export default Dom;