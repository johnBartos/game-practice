'use strict';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;

let ctrlX = 20;
let ctrlY = 20;
const speed = 2;

let dx = 1;
let dy = 1;
let radius = 10;

let left = false;
let right = false;
let up = false;
let down = false;

const keyDownHandler = (e) => {
  if (e.keyCode === 39) {
    right = true;
  }
  if (e.keyCode === 37) {
    left = true;
  }
  if (e.keyCode === 38) {
    up = true;
  }
  if (e.keyCode === 40) {
    down = true;
  }
};

const keyUpHandler = (e) => {
  if (e.keyCode === 39) {
    right = false;
  }
  if (e.keyCode === 37) {
    left = false;
  }
  if (e.keyCode === 38) {
    up = false;
  }
  if (e.keyCode === 40) {
    down = false;
  }
};

const detectCollision = () => {
  const xDiff = ballX - ctrlX;
  const yDiff = ballY - ctrlY;
  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  if (distance < radius + radius) {
    dx = -dx;
    dy = -dy;
  }
};

const drawBall = () => {
  context.beginPath();
  context.arc(ballX, ballY, radius, 0, Math.PI * 2);
  context.fillStyle = '#FF0000';
  context.fill();
  context.closePath();
};

const moveBall = () => {
  if (ballY + dy < radius || ballY + dy > canvas.height - radius) {
    dy = -dy;
  }

  if (ballX + dx > canvas.width - radius || ballX + dx < radius) {
    dx = -dx;
  }
};

const drawControlBall = () => {
  context.beginPath();
  context.arc(ctrlX, ctrlY, radius * 2, 0, Math.PI * 2);
  context.fillStyle = '#FF0000';
  context.fill();
  context.closePath();
};

const moveBox = () => {
  if (left) {
    ctrlX -= speed;
  }
  if (right) {
    ctrlX += speed;
  }
  if (up) {
    ctrlY -= speed;
  }
  if (down) {
    ctrlY += speed;
  }
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawControlBall();
  drawBall();
  moveBox();
  moveBall();
  detectCollision();
  ballX += dx;
  ballY += dy;
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

(() => {
  const main = (tFrame) => {
    window.requestAnimationFrame(main);
    draw();
  };
  main();
})();
