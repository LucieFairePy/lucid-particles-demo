/*
 * Lucid Particles - Interactive Particle Animation
 * Copyright (C) 2024 Lucifer.exe
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getCssVar(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v);
}

let text404 = CONFIG.text.content;
let canvas = document.getElementById('scene');
let ch = canvas.height = canvas.getBoundingClientRect().height;
let cw = canvas.width = canvas.getBoundingClientRect().width;
let sceneBackground = CONFIG.scene.backgroundColor;
let context = canvas.getContext('2d');
let previousMouseCoord = {x:0, y:0};
let mouseCoord = {x:0, y:0};
let sceneResize = false;
let particlesCount = 0;
let particles = [];
let colors = CONFIG.particle.colors;
const dpi = CONFIG.particle.dpi;

let Particle = function(x, y) {
  this.x =  getRandomInt(cw);
  this.y =  getRandomInt(ch);
  this.coord = {x:x, y:y};
  this.r =  Math.min((getRandomInt((cw / dpi)) + 1), CONFIG.particle.maxSize);
  this.vx = (Math.random() - 0.5) * CONFIG.particle.velocity.multiplier;
  this.vy = (Math.random() - 0.5) * CONFIG.particle.velocity.multiplier;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * (CONFIG.particle.friction.max - CONFIG.particle.friction.min) + CONFIG.particle.friction.min;
  this.color = colors[Math.floor(Math.random() * colors.length)];
}

Particle.prototype.render = function(isDisableMouse) {
  this.accX = (this.coord.x - this.x) / 100;
  this.accY = (this.coord.y - this.y) / 100;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.x += this.vx;
  this.y +=  this.vy;
  
  if (!isDisableMouse && CONFIG.particle.mouseRepulsion.enabled) {
    let a = this.x - mouseCoord.x;
    let b = this.y - mouseCoord.y;
    var distance = Math.sqrt(a * a + b * b);
    if(distance < (cw / CONFIG.particle.mouseRepulsion.distance)) {
      this.accX = (this.x - mouseCoord.x) / 100;
      this.accY = (this.y - mouseCoord.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
    }
  }
  
  context.fillStyle = this.color;
  context.moveTo(this.x, this.y);
  context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
}

function onmouseCoordMove(e) {
  mouseCoord.x = e.clientX;
  mouseCoord.y = e.clientY;
}

function onTouchMove(e) {
  if(e.touches.length > 0 ) {
    mouseCoord.x = e.touches[0].clientX;
    mouseCoord.y = e.touches[0].clientY;
  }
}

function onTouchEnd() {
  mouseCoord.x = -9999;
  mouseCoord.y = -9999;
}

function initScene() {
  ch = canvas.height = canvas.getBoundingClientRect().height;
  cw = canvas.width = canvas.getBoundingClientRect().width;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = CONFIG.text.fontWeight + ' ' + (cw / 10) + 'px ' + CONFIG.text.fontFamily;
  context.fillStyle = sceneBackground;
  context.textAlign = 'center';
  context.fillText(text404, cw / 2, ch / 2);
  let imageData = context.getImageData(0, 0, cw, ch).data;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = 'screen';
  particles = [];
  for(let y = 0; y < ch; y += Math.round(cw / dpi)) {
    for(let x = 0; x < cw; x += Math.round(cw / dpi)) {
      if(imageData[((x + y * cw) * 4) + 3] > 128){
        particles.push(new Particle(x, y));
      }
    }
  }
  particlesCount = particles.length;
}

function renderScene() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let isDisableMouse = false;
  if ((previousMouseCoord.x === mouseCoord.x) && (previousMouseCoord.x === mouseCoord.x)) {
    isDisableMouse = true;
  } else {
    previousMouseCoord.x = mouseCoord.x;
    previousMouseCoord.x = mouseCoord.x;
    isDisableMouse = false;
  }
  context.beginPath();
  for (let i = 0; i < particlesCount; i++) {
    particles[i].render(isDisableMouse);
  }
  context.fill();
  context.closePath();
  requestAnimationFrame(renderScene);
};

document.addEventListener('DOMContentLoaded', function() {
  initScene();
  requestAnimationFrame(renderScene);
  window.addEventListener('mousemove', onmouseCoordMove);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);
  window.addEventListener('resize', function() {
    if (!sceneResize) {
      requestAnimationFrame(function() {
        initScene();
        sceneResize = false;
      });
      sceneResize = true;
    }
  });
});
