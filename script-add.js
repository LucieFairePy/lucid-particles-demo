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

let fadeLimit;

function updateFadeLimit() {
  if (!CONFIG.scene.fadeOnScroll) return;
  
  const width = window.innerWidth;
  const height = window.innerHeight;

  const isMobile = width <= 768;
  const isPortrait = height >= width;

  if (isMobile && isPortrait) {
    fadeLimit = document.body.scrollHeight * CONFIG.scene.fadeLimit.mobile.portrait;
  } else if (isMobile && !isPortrait) {
    fadeLimit = document.body.scrollHeight * CONFIG.scene.fadeLimit.mobile.landscape;
  } else {
    fadeLimit = document.body.scrollHeight * CONFIG.scene.fadeLimit.desktop;
  }
}

updateFadeLimit();
window.addEventListener('resize', updateFadeLimit);
window.addEventListener('orientationchange', updateFadeLimit);

window.addEventListener('scroll', () => {
  if (!CONFIG.scene.fadeOnScroll) return;
  
  const scrollTop = window.scrollY || window.pageYOffset;
  const scene = document.getElementById('scene');

  scene.style.opacity = scrollTop < fadeLimit ? 1 : 0;
});
