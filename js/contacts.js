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

  // Hide Logo on Scroll
document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.navbar .logo');
  const footer = document.querySelector('footer');
  
  if (!logo || !footer) return;

  let lastScrollTop = 0;
  const hideThreshold = 50;
  const scaleThreshold = 200;

  function updateLogo() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 576) {
      logo.style.opacity = '0';
      logo.style.pointerEvents = 'none';
      return; 
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const footerRect = footer.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();

    const scrollingDown = scrollTop > lastScrollTop;
    const scrollingUp = scrollTop < lastScrollTop;

    const distanceToFooter = footerRect.top - logoRect.bottom;
    let scale = 1;
    
    if (distanceToFooter < scaleThreshold) {
      scale = Math.max(0.4, distanceToFooter / scaleThreshold);
    }

    if ((scrollingDown || scrollingUp) && scrollTop > hideThreshold) {
      logo.style.opacity = '0';
      logo.style.pointerEvents = 'none';
    } else {
      logo.style.opacity = '1';
      logo.style.pointerEvents = 'auto';
    }

    logo.style.transform = `scale(${scale}) translateY(${(1 - scale) * 30}px)`;

    if (distanceToFooter < 50) {
      logo.style.opacity = '0';
      logo.style.pointerEvents = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener('scroll', updateLogo);
  window.addEventListener('resize', updateLogo);
  updateLogo();
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