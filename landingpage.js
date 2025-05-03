// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {

  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
    offset: 100
  });

  // Reveal hero content with GSAP
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBtn = document.querySelector('.hero-btn');
  
  if (heroTitle && heroSubtitle && heroBtn) {
    heroTitle.classList.add('reveal');
    heroSubtitle.classList.add('reveal');
    heroBtn.classList.add('reveal');
  }
  
   
  // Update scroll position for ScrollTrigger
  window.addEventListener('scroll', function () {
    ScrollTrigger.update();
    AOS.refresh();
  });
  
  
  
  // ============ HEADER LOGIC START ============ dropdownTriggers.forEach
  const menuTrigger = document.getElementById('menuTrigger');
  const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
  const closeOverlay = document.getElementById('closeOverlay');
  const overlayNav = document.getElementById('overlayNav');
  const header = document.getElementById('header');
  
  // Toggle overlay navigation
  function toggleOverlay() {
    overlayNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

  }
  
  // Event listeners for menu triggers
  menuTrigger.addEventListener('click', toggleOverlay);
  mobileMenuTrigger.addEventListener('click', toggleOverlay);
  closeOverlay.addEventListener('click', toggleOverlay);
  
  // Handle dropdown menus in overlay
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const parent = this.parentElement;
  
      // Close all other dropdowns
      dropdownTriggers.forEach(otherTrigger => {
        const otherParent = otherTrigger.parentElement;
        const otherIcon = otherTrigger.querySelector('.dropdown-icon');
  
        if (otherParent !== parent) {
          otherParent.classList.remove('active');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });
  
      // Toggle this one
      const icon = this.querySelector('.dropdown-icon');
      parent.classList.toggle('active');
      if (icon) icon.textContent = parent.classList.contains('active') ? '−' : '+';
    });
  });
  
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // ============ HEADER LOGIC END ============
  
  // ============ HERO PARALLAX START ============
  // Create hero particles
  const particlesContainer = document.getElementById('particles');
  
  function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.classList.add('particle');
      
      // Random size between 2px and 5px
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      // Add to container
      particlesContainer.appendChild(particle);
      
      // Animate with GSAP
      gsap.to(particle, {
        x: `${Math.random() * 100 - 50}px`,
        y: `${Math.random() * 100 - 50}px`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }
  
  createParticles();
  
  // Hero section parallax
  const heroLayers = document.querySelectorAll('.hero-layer');
  
  function heroParallax() {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      
      heroLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        layer.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
  
  heroParallax();
  // ============ HERO PARALLAX END ============
  

  // ============ FIX: Lazy Load Swiper INIT ============
  function lazyInitSwiper(selector, initCallback) {
    const target = document.querySelector(selector);
    if (!target) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initCallback();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(target);
  }

  // ============ PROJECTS CAROUSEL INIT ============
  lazyInitSwiper('.projects-carousel', () => {
    const projectsSwiper = new Swiper('.projects-carousel', {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      grabCursor: true,
      loop: true,
      speed: 800,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 5,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.project-next',
        prevEl: '.project-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 1.5,
        },
        1200: {
          slidesPerView: 1.5,
        },
      },
      on: {
        slideChange: function () {
          const slides = document.querySelectorAll('.team-slider .swiper-slide');
        
          let closestSlide = null;
          let closestDistance = Infinity;
          const containerCenter = window.innerWidth / 2;
        
          slides.forEach(slide => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - slideCenter);
        
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSlide = slide;
            }
          });
        
          slides.forEach(slide => {
            const innerCard = slide.querySelector('.team-slide');
            if (!innerCard) return;
        
            if (slide === closestSlide) {
              gsap.to(innerCard, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else {
              gsap.to(innerCard, {
                scale: 0.85,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });
        }
        
      }
    });
  });
  
  // Add 3D tilt effect to projects
  const projectSlides = document.querySelectorAll('.project-slide');
  
  projectSlides.forEach(slide => {
    slide.addEventListener('mousemove', function(e) {
      const slideRect = slide.getBoundingClientRect();
      const slideWidth = slideRect.width;
      const slideHeight = slideRect.height;
      
      // Calculate mouse position relative to the slide
      const mouseX = e.clientX - slideRect.left;
      const mouseY = e.clientY - slideRect.top;
      
      // Calculate rotation based on mouse position
      const rotateY = ((mouseX / slideWidth) - 0.5) * 10;
      const rotateX = ((mouseY / slideHeight) - 0.5) * -10;
      
      // Apply the rotation
      slide.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    slide.addEventListener('mouseleave', function() {
      // Reset rotation when mouse leaves
      slide.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // ============ TEAM SLIDER INIT ============
  const teamSwiper = new Swiper('.team-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    speed: 800,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: '.team-next',
      prevEl: '.team-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
    },
    on: {
      on: {
        slideChangeTransitionEnd: function () {
          const slides = document.querySelectorAll('.team-slider .swiper-slide');
      
          let closestSlide = null;
          let closestDistance = Infinity;
          const containerCenter = window.innerWidth / 2;
      
          slides.forEach(slide => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - slideCenter);
      
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSlide = slide;
            }
          });
      
          slides.forEach(slide => {
            const innerCard = slide.querySelector('.team-slide');
            if (!innerCard) return;
      
            if (slide === closestSlide) {
              gsap.to(innerCard, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else {
              gsap.to(innerCard, {
                scale: 0.85,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });
        }
      }
      
    }
  });
  
  // Team card flip effect
  const flipTriggers = document.querySelectorAll('.team-flip-trigger');
  const flipBackBtns = document.querySelectorAll('[data-flip="back"]');
  
  flipTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const card = this.closest('.team-card-inner');
      card.style.transform = 'rotateY(180deg)';
    });
  });
  
  flipBackBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.team-card-inner');
      card.style.transform = 'rotateY(0deg)';
    });
  });
  
  // ============ GALLERY SLIDER INIT ============
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryDots = document.querySelectorAll('.gallery-dot');
  const galleryScroller = document.getElementById('galleryScroller');
  const progressBar = document.getElementById('galleryProgressBar');
  let activeGalleryIndex = 0;
  let galleryTimer;
  const galleryAutoplayDelay = 5000;
  
  // Initialize gallery
  function initGallery() {
    // Set first slide as active
    galleryItems[0].classList.add('active');
    
    // Set positions for each gallery item
    updateGalleryPositions();
    
    // Start autoplay
    startGalleryAutoplay();
    
    // Add event listeners for dots
    galleryDots.forEach(dot => {
      dot.addEventListener('click', function() {
        const dotIndex = parseInt(this.getAttribute('data-index'));
        updateGallery(dotIndex);
      });
    });
    
    // Gallery item click for lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        openLightbox(parseInt(this.getAttribute('data-index')));
      });
    });
  }
  
  function updateGalleryPositions() {
    galleryItems.forEach((item, index) => {
      // Reset classes
      item.classList.remove('active');
      
      // Calculate position based on activeIndex
      const position = index - activeGalleryIndex;
      
      // Set transform depending on position
      if (position === 0) {
        // Active slide
        item.style.transform = 'translateX(0) scale(1)';
        item.style.zIndex = '5';
        item.classList.add('active');
      } else if (position === -1 || position === galleryItems.length - 1) {
        // Previous slide
        item.style.transform = 'translateX(-100%) scale(0.8)';
        item.style.zIndex = '4';
      } else if (position === 1 || position === -(galleryItems.length - 1)) {
        // Next slide
        item.style.transform = 'translateX(100%) scale(0.8)';
        item.style.zIndex = '4';
      } else if (position < -1) {
        // Far left slides
        item.style.transform = 'translateX(-180%) scale(0.6)';
        item.style.zIndex = '3';
      } else if (position > 1) {
        // Far right slides
        item.style.transform = 'translateX(180%) scale(0.6)';
        item.style.zIndex = '3';
      }
    });
    
    // Update dots scroll.scrollTo
    galleryDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeGalleryIndex);
    });
    
    // Reset and start progress bar
    progressBar.style.width = '0%';
    gsap.to(progressBar, {
      width: '100%',
      duration: galleryAutoplayDelay / 1000,
      ease: 'none'
    });
  }
  
  function updateGallery(newIndex) {
    // Stop autoplay
    stopGalleryAutoplay();
    
    // Update active index
    activeGalleryIndex = newIndex;
    
    // Update positions slideChange: function
    updateGalleryPositions();
    
    // Restart autoplay
    startGalleryAutoplay();
  }
  
  function nextGallerySlide() {
    let newIndex = activeGalleryIndex + 1;
    if (newIndex >= galleryItems.length) {
      newIndex = 0;
    }
    updateGallery(newIndex);
  }
  
  function prevGallerySlide() {
    let newIndex = activeGalleryIndex - 1;
    if (newIndex < 0) {
      newIndex = galleryItems.length - 1;
    }
    updateGallery(newIndex);
  }
  
  function startGalleryAutoplay() {
    galleryTimer = setInterval(nextGallerySlide, galleryAutoplayDelay);
  }
  
  function stopGalleryAutoplay() {
    clearInterval(galleryTimer);
  }
  
  // Initialize gallery
  initGallery();
  
  // ============ GALLERY LIGHTBOX LOGIC ============
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  let activeLightboxIndex = 0;
  
  function openLightbox(index) {
    activeLightboxIndex = index;
    updateLightboxContent();
    
    // Stop gallery autoplay
    stopGalleryAutoplay();
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
    //scroll.stop();
  }
  
  function closeLightbox() {
    // Hide lightbox
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
    //scroll.start();
    
    // Restart gallery autoplay 
    startGalleryAutoplay();
  }
  
  function updateLightboxContent() {
    const currentItem = galleryItems[activeLightboxIndex];
    const img = currentItem.querySelector('img');
    const caption = img.getAttribute('data-caption');
    
    // Update image and caption
    lightboxImage.src = img.src;
    lightboxCaption.textContent = caption;
    
    // Animate content
    gsap.fromTo(lightboxImage, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
  
  function nextLightboxSlide() {
    activeLightboxIndex = (activeLightboxIndex + 1) % galleryItems.length;
    updateLightboxContent();
  }
  
  function prevLightboxSlide() {
    activeLightboxIndex = (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  }
  
  // Lightbox event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextLightboxSlide);
  lightboxPrev.addEventListener('click', prevLightboxSlide);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextLightboxSlide();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxSlide();
    }
  });
  
  // ============ NEWS SECTION SCROLL ANIMATION ============
  const newsItems = document.querySelectorAll('.news-item');
  
  // Reveal news items on scroll scrollTrigger scrollTrigger
  function revealNewsItems() {
    gsap.registerPlugin(ScrollTrigger);
    
    newsItems.forEach((item, index) => {
      const delay = index * 0.15;
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: delay,
            ease: 'power2.out'
          });
        },
        once: true
      });
      
      
    });
  }
  
  revealNewsItems();
  
  // ============ LANGUAGE TOGGLE LOGIC ============
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      langButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Here you would typically implement language switching logic
      const lang = this.getAttribute('data-lang');
      console.log('Switching to language:', lang);
    });
  });
  
  // ============ SMOOTH SCROLLING ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close overlay if open
        if (overlayNav.classList.contains('active')) {
          toggleOverlay();
        }
        
        // Use Locomotive Scroll for smooth scrolling
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
          
      }
    });
  });
    
  // ============ CTA SECTION PARALLAX ============ gsap.to('.quote-section blockquote'
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax for CTA shapes
  const ctaShapes = document.querySelectorAll('.cta-shape');
  
  ctaShapes.forEach((shape, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const speed = 0.2 + (index * 0.1);
    
    gsap.to(shape, {
      y: `${direction * 50}px`,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      ease: 'none'
    });
  });
  
  // ============ SCROLL-BASED ANIMATIONS ============
  // Mission section parallax function handleResponsive()
  gsap.to('.mission-image', {
    y: -50,
    scrollTrigger: {
        trigger: '.mission-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
      
  });
  
  // Quote section parallax
  gsap.to('.quote-section blockquote', {
    y: -30,
    scrollTrigger: {
      trigger: '.quote-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Add noise texture to background for more visual interest
  const noiseTexture = document.createElement('div');
  noiseTexture.classList.add('noise-texture');
  noiseTexture.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==');
    pointer-events: none;
    z-index: 9999;
    opacity: 0.2;
  `;
  document.body.appendChild(noiseTexture);
});
//ScrollTrigger.create