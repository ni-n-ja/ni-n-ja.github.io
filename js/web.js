'use strict'

var ctx;
var backCtx;
var canvas;

var th;
var thPlus;
var height;
var x;
var scale;
var tension = 0;
var imageWidth;

window.onload = () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js', {
            scope: './'
        }).catch((e) => {
            console.error(e);
        });
    }

    let qr = document.getElementById("QR");
    let qrContainer = document.getElementsByClassName("QRcontainer")[0];
    canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    let backCanvas = document.createElement('canvas');
    backCanvas.setAttribute('width', canvas.width + 'px');
    backCanvas.setAttribute('height', canvas.height + 'px');
    backCanvas.setAttribute('background-color', 'rgba(0,0,0,0)');
    backCtx = backCanvas.getContext("2d");

    let DOMURL = self.URL || self.webkitURL || self;
    let svg = new Blob([qr.outerHTML], {
        type: "image/svg+xml;charset=utf-8"
    });
    let url = DOMURL.createObjectURL(svg);
    let img = new Image();
    img.src = url;
    img.onload = function () {
        let wRatio = canvas.width / canvas.scrollWidth;
        // let hRatio = canvas.height / canvas.scrollHeight;
        backCtx.drawImage(img, 0, 0, img.width, img.height,
            (canvas.clientWidth - qrContainer.clientWidth) * wRatio / 2,
            (canvas.clientWidth - qrContainer.clientWidth) * wRatio / 2,
            qrContainer.clientWidth * wRatio, qrContainer.clientWidth * wRatio);
        imageWidth = canvas.width;
        DOMURL.revokeObjectURL(svg);
        th = 0;
        thPlus = 0.1;

        noise();
        fireNoise();
    }

}

function noise() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    th %= 2 * Math.PI;
    th += thPlus;
    for (var i = 0; i < imageWidth;) {
        height = parseInt(Math.random() * Math.random() * 60);
        if (height <= 1) {
            height = 1;
        }
        x = Math.sin((i / 100) * Math.PI + th * (0.5 - Math.random()) * Math.random() * 10) * 12 * (0.5 - Math.random());
        scale = Math.exp(-1 * Math.pow(((i - (imageWidth / 2)) / (imageWidth / 2)), 2) / 0.2) * (Math.random() * Math.random());
        x *= scale * tension;
        if (0.5 - Math.random() < 0) {
            x *= -1;
        }
        ctx.putImageData(backCtx.getImageData(0, i, canvas.width, i + height), x, i);
        i += (height <= 1) ? 1 : height;
    }

    if (tension > 2) {
        tension *= 0.7;
    } else {
        tension = 0;
    }

    setTimeout(() => {
        noise();
    }, 45);

}

function fireNoise() {
    tension += 50;
    tension %= 360;
    setTimeout(() => {
        fireNoise();
    }, Math.random() * 3000);
}