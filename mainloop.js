'use strict';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let boxX = 20;
let boxY = 20;
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

const drawBall = () => {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = '#FF0000';
  context.fill();
  context.closePath();
};

const moveBall = () => {
  if (y + dy < radius || y + dy > canvas.height - radius) {
    dy = -dy;
  }

  if (x + dx > canvas.width - radius || x + dx < radius) {
    dx = -dx;
  }
};

const drawBox = () => {
  context.beginPath();
  context.rect(boxX, boxY, 20, 40);
  context.fillStyle = '#FF0000';
  context.fill();
  context.closePath();
};

const moveBox = () => {
  if (left) {
    boxX -= speed;
  }
  if (right) {
    boxX += speed;
  }
  if (up) {
    boxY -= speed;
  }
  if (down) {
    boxY += speed;
  }
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBox();
  drawBall();
  moveBox();
  moveBall();
  x += dx;
  y += dy;
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
