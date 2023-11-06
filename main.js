const canvas = document.getElementById("tutorial");
const ctx = canvas.getContext("2d");

const w = window.innerWidth
const h = window.innerHeight

ctx.canvas.width = w;
ctx.canvas.height = h;

//-----------------------

let squareX = 20, squareY = 20;
let dirX = "plus", dirY = "plus";
let amt, startColor, newColor;
let r = 255, g = 0, b = 0;
let speed = 10;
let wait = 100;

ctx.shadowBlur = 50;

ctx.fillStyle = "lightgrey";
ctx.fillRect(0, 0, w, h);

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomColor() {
    changeColor()
    return `rgb(${r}, ${g}, ${b})`
}

function changeColor() {
    r = randomNumber(0, 255)
    g = randomNumber(0, 255)
    b = randomNumber(0, 255)
}

function checkSquareCordsX(cord) {
    if (cord > w - 90) {
        speed += 1;
        wait -= 2
        dirX = "minus"
    } else if (cord < 20) {
        speed += 1
        wait -= 2
        dirX = "plus"
    }
}

function checkSquareCordsY(cord) {
    if (cord > h - 90) {
        speed += 1;
        wait -= 1
        dirY = "minus"
    } else if (cord < 20) {
        speed += 1
        wait -= 1
        dirY = "plus"
    }
}

function drawSquare() {
    const color = randomColor()
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.fillRect(squareX, squareY, 90, 90);
    ctx.closePath()
}

const timer = ms => new Promise(r => setTimeout(r, ms));

function animate() {
    checkSquareCordsX(squareX)
    checkSquareCordsY(squareY)

    if (dirX === "plus") {
        squareX += speed
    } else {
        squareX = squareX <= speed ? 0 : squareX -= speed
    }

    if (dirY === "plus") {
        squareY += speed
    } else {
        squareY = squareY <= speed ? 0 : squareY -= speed
    }

    drawSquare()
}

const init = async () => {
    let i = 0
    while (i < 1500) {
        animate()
        await timer(wait)
        i++
    }
    ctx.clearRect(0, 0, w, h)
    wait = 200
    speed = 10
    init()
}

init()