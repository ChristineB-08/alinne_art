// Navbar
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.main-menu-items');
    const menuItems = document.querySelectorAll('.main-menu-items a');
  
    toggleButton.addEventListener('click', function (event) {
      event.stopPropagation();
      mobileMenu.classList.toggle('active');
    });
  
    menuItems.forEach((item) => {
      item.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
      });
    });
  
    document.addEventListener('click', function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        mobileMenu.classList.remove('active');
      }
    });
  });

//Contacts
document.addEventListener('DOMContentLoaded', () => {
    const filmContainer = document.querySelector('.film-container');
    const filmStrip = document.querySelector('.film-strip');
    
    if (!filmStrip) return;
  
    const originalContent = filmStrip.innerHTML;
    filmStrip.innerHTML = originalContent + originalContent;
  
    let position = 0;
    let animationId = null;
    const speed = 0.1;
    let lastTime = Date.now();
  
    const resetThreshold = filmStrip.scrollWidth / 2;
  
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
  
      position += speed * deltaTime;
      
      if (position >= resetThreshold) {
        position = 0;
      }
  
      filmStrip.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
  
    animate();
  
    filmContainer.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
    });
  
    filmContainer.addEventListener('mouseleave', () => {
      lastTime = Date.now();
      animate();
    });
  
    let resizeTimeout;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      filmStrip.style.transform = 'translateX(0)';
      position = 0;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        filmStrip.innerHTML = originalContent + originalContent;
        animate();
      }, 100);
    });
  });