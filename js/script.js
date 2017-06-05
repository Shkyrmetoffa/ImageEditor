let ctx,
    color = '#000',
    innerWidth = window.innerWidth,
    innerHeight = window.innerHeight - 90,
    canvasElem,
    palette = document.getElementsByClassName('palette'),
    contentElem = document.getElementById('content');

document.addEventListener(
    'DOMContentLoaded',
    () => {
        setTimeout(() => {
            newCanvas();
        }, 1000);
    },
    false
);

document.getElementById('getVal').addEventListener('click', event => {
    event.preventDefault();
    ctx.lineWidth = exampleInput.value;
});
exampleInput.onchange = function() {
    ctx.lineWidth = document.getElementById('exampleInput').value;
};
let newCanvas = () => {
    contentElem.style.height = window.innerHeight - 90;
    let canvas = `<canvas id="canvas" width= "${innerWidth}" height= "${innerHeight}"></canvas>`;
    contentElem.innerHTML = canvas;
    canvasElem = document.getElementById('canvas');
    ctx = canvasElem.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = exampleInput;

    drawTouch();
    drawPointer();
    drawMouse();
};

let selectColor = el => {
    for (let i = 0; i < palette.length; i++) {
        palette[i].style.borderColor = '#777';
        palette[i].style.borderStyle = 'solid';
    }
    el.style.borderColor = '#fff';
    el.style.borderStyle = 'dashed';
    color = window.getComputedStyle(el).backgroundColor;
    ctx.beginPath();
    ctx.strokeStyle = color;
};
let drawTouch = () => {
    let start = e => {
        ctx.beginPath();
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY - 44;
        ctx.moveTo(x, y);
    };
    let move = e => {
        e.preventDefault();
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY - 44;
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    canvasElem.addEventListener('touchstart', start, false);
    canvasElem.addEventListener('touchmove', move, false);
};
let drawPointer = () => {
    let start = e => {
        e = e.originalEvent;
        ctx.beginPath();
        x = e.pageX;
        y = e.pageY - 44;
        ctx.moveTo(x, y);
    };
    let move = e => {
        e.preventDefault();
        e = e.originalEvent;
        x = e.pageX;
        y = e.pageY - 44;
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    canvasElem.addEventListener('MSPointerDown', start, false);
    canvasElem.addEventListener('MSPointerMove', move, false);
};
let drawMouse = () => {
    let clicked = 0;
    let start = e => {
        clicked = 1;
        ctx.beginPath();
        x = e.pageX;
        y = e.pageY - 44;
        ctx.moveTo(x, y);
    };
    let move = e => {
        if (clicked) {
            x = e.pageX;
            y = e.pageY - 44;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };
    let stop = e => {
        clicked = 0;
    };
    canvasElem.addEventListener('mousedown', start, false);
    canvasElem.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', stop, false);
};