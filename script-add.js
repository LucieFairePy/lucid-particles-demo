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
