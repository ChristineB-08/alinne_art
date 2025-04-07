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

// Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: false,
  slidesPerView: 3,
  loopedSlides: 5,
  loopAdditionalSlides: 3,
  spaceBetween: 10,
  coverflowEffect: {
    rotate: 30,
    stretch: 10,
    depth: 100,
    modifier: 1.5,
    slideShadows: true,
  },
  keyboard: { enabled: true },
  mousewheel: { thresholdDelta: 70 },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
});

// Segnalibri
gsap.set('.segnalibri-content h3', { opacity: 1 });

gsap.fromTo(
  '.segnalibri-content h3',
  {
    y: '100%',
    rotate: 180,
    opacity: 0,
  },
  {
    y: '-100%',
    rotate: 0,
    duration: 5,
    stagger: 0.1,
    repeat: -1,
    ease: 'power2.inOut',
    opacity: 1,
  }
);

// Segnalibri - Responsive
function updateTextForSmallScreen() {
  let mediaQuery = window.matchMedia("(max-width: 576px)");
  let textContainer = document.querySelector(".segnalibri-content");

  if (mediaQuery.matches) {
    if (!textContainer.dataset.triplicated) {
      let originalContent = textContainer.innerHTML;

      textContainer.innerHTML =
        originalContent +
        `<div style="height: 3rem;"></div>` +
        originalContent +
        `<div style="height: 3rem;"></div>` +
        originalContent;

      textContainer.dataset.triplicated = "true"; 

      applyGsapAnimation();
    }
  } else {
    if (textContainer.dataset.triplicated) {
      textContainer.innerHTML = textContainer.innerHTML.split(`<div style="height: 3rem;"></div>`)[0];
      delete textContainer.dataset.triplicated; 

      applyGsapAnimation();
    }
  }
}

function applyGsapAnimation() {
  gsap.killTweensOf(".segnalibri-content h3");

  gsap.fromTo(
    ".segnalibri-content h3",
    {
      y: "100%",
      rotate: 180,
      opacity: 0,
    },
    {
      y: "-100%",
      rotate: 0,
      duration: 5,
      stagger: 0.1,
      repeat: -1,
      ease: "power2.inOut",
      opacity: 1,
    }
  );
}

// H1 Auttore

updateTextForSmallScreen();

window.addEventListener("resize", updateTextForSmallScreen);

document.addEventListener("DOMContentLoaded", function () {
  let title = document.querySelector(".author-title");
  let container = document.getElementById("particle-container");

  function createParticles() {
    let text = title.innerText;
    title.style.opacity = "0"; 

    let letters = text.split("");
    container.innerHTML = ""; 

    letters.forEach((letter, index) => {
      let span = document.createElement("span");
      span.innerText = letter;
      span.classList.add("particle");
      container.appendChild(span);

      gsap.fromTo(
        span,
        { opacity: 0, y: -50, scale: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          onComplete: function () {
            gsap.to(span, {
              opacity: 0,
              y: -50,
              scale: 0,
              duration: 1.5,
              delay: index * 0.05,
              ease: "power3.out",
              onComplete: () => span.remove(),
            });
          },
        }
      );
    });

    setTimeout(createParticles, 4000);
  }

  createParticles();
});

// Testo Autore

document.addEventListener("DOMContentLoaded", function () {
  let textElement = document.querySelector(".author-text");

  let textContainer = document.createElement("div");
  textContainer.classList.add("text-particle-container");
  textElement.parentNode.insertBefore(textContainer, textElement);

  textElement.style.opacity = "0"; 

  function animateTextParticles() {
    let text = textElement.innerText;
    let letters = text.split(/( )/); 

    textContainer.innerHTML = ""; 

    letters.forEach((letter, index) => {
      let span = document.createElement("span");
      span.innerHTML = letter === " " ? "&nbsp;" : letter; 
      span.classList.add("particle-letter");
      textContainer.appendChild(span);

      let randomX = (Math.random() - 0.5) * 200; 
      let randomY = (Math.random() - 0.5) * 200; 
      let randomScale = Math.random() * 2 + 0.5; 

      gsap.fromTo(
        span,
        { opacity: 0, y: 0, scale: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          delay: index * 0.04,
          onComplete: function () {
            gsap.to(span, {
              opacity: 0,
              x: randomX,
              y: randomY,
              scale: randomScale,
              rotation: Math.random() * 360,
              duration: 1.5,
              delay: 1.6,
              ease: "power3.out",
              onComplete: function () {
                gsap.set(span, { x: 0, y: 0, scale: 1, opacity: 0 });
                gsap.to(span, {
                  opacity: 1,
                  duration: 1.6,
                  delay: index * 0.04,
                  ease: "power2.inOut",
                });
              },
            });
          },
        }
      );
    });

    setTimeout(animateTextParticles, 9000); 
  }

  animateTextParticles();
});

