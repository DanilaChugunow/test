document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.getElementById('burgerIcon');
    const burgerNav = document.getElementById('burgerNav');
    const closeBurger = document.getElementById('closeBurger');
    burgerIcon.addEventListener('click', function () {
        burgerNav.classList.add('open');
    });
    closeBurger.addEventListener('click', function () {
        burgerNav.classList.remove('open');
    });

    document.addEventListener('click', function (e) {
        if (!burgerNav || !burgerIcon) return;

        if (!burgerNav.classList.contains('open')) return;

        const clickedInsideNav = e.target.closest('#burgerNav');
        const clickedBurgerIcon = e.target.closest('#burgerIcon');
        if (!clickedInsideNav && !clickedBurgerIcon) {
            burgerNav.classList.remove('open');
        }
    });

    document.querySelectorAll('.burger-nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
                burgerNav.classList.remove('open');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon540 = document.querySelector('.burger-icon540');
    const burgerNav540 = document.querySelector('.burger-nav540');
    const closeBurger540 = document.querySelector('.close-burger540');

    if (burgerIcon540 && burgerNav540 && closeBurger540) {
        burgerIcon540.addEventListener('click', function() {
            burgerNav540.classList.add('open');
        });

        closeBurger540.addEventListener('click', function() {
            burgerNav540.classList.remove('open');
        });

        document.addEventListener('click', function(e) {
            if (!burgerNav540.contains(e.target) && !burgerIcon540.contains(e.target)) {
                burgerNav540.classList.remove('open');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
	const slides = document.querySelectorAll('.slide');
	const prevBtn = document.querySelector('.slider-btn.prev');
	const nextBtn = document.querySelector('.slider-btn.next');
	let current = 0;

	function showSlide(idx) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === idx);
		});
	}

	if (prevBtn && nextBtn) {
		prevBtn.addEventListener('click', function () {
			current = (current - 1 + slides.length) % slides.length;
			showSlide(current);
		});
		nextBtn.addEventListener('click', function () {
			current = (current + 1) % slides.length;
			showSlide(current);
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {
	const tabButtons = document.querySelectorAll('.tab-btn');
	const tabContents = document.querySelectorAll('.tab-content');

	tabButtons.forEach(btn => {
		btn.addEventListener('click', function () {
			tabButtons.forEach(b => b.classList.remove('active'));
			tabContents.forEach(tc => {
				tc.classList.remove('active');
				tc.style.animation = 'none';
			});
			
			btn.classList.add('active');
			
			const tabId = btn.getAttribute('data-tab');
			const targetContent = document.getElementById(tabId);
			
			targetContent.offsetHeight;
			
			setTimeout(() => {
				targetContent.classList.add('active');
			}, 10);
		});
	});
});

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

   
    function checkInitialVisibility(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        const elementHeight = rect.height || element.offsetHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercent = elementHeight > 0 ? (visibleHeight / elementHeight) * 100 : 0;
        
        return (
            rect.top < windowHeight + 100 && 
            rect.bottom > -100 && 
            rect.left < windowWidth &&
            rect.right > 0 &&
            visiblePercent > 5 
        );
    }

    function addAnimationWithCheck(selector, animationClass = 'animate-on-scroll', useRAF = true) {
        const elements = document.querySelectorAll(selector);
        
        const processElements = function() {
            elements.forEach((el, index) => {
                el.classList.add(animationClass);
                
                if (checkInitialVisibility(el)) {
                    el.classList.add('visible');
                } else {
                    observer.observe(el);
                }
            });
        };
        
        if (useRAF) {
            requestAnimationFrame(processElements);
        } else {
            processElements();
        }
    }

    const animatedElements = document.querySelectorAll('.information, .video-section, .slider-section, .tabs, footer, .otdel__info');
    
    requestAnimationFrame(function() {
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            if (checkInitialVisibility(el)) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    });

    addAnimationWithCheck('.hist, .put, .slide-photos, .tab-content');

    addAnimationWithCheck('.information h2, .video-section h2, .slider-section h2, .otdel__info h2');

    const otdelInfo = document.querySelector('.otdel__info');
    const cards = document.querySelectorAll('.otdel__info .cards .card');
 
    function showVisibleCards() {
        if (!otdelInfo || cards.length === 0) return;
  
        const sectionRect = otdelInfo.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
     
        const sectionVisible = sectionRect.top < windowHeight + 300 && sectionRect.bottom > -100;
        
        if (sectionVisible) {
            otdelInfo.classList.add('visible');
            
            cards.forEach((card) => {
                if (!card.classList.contains('animate-on-scroll')) {
                    card.classList.add('animate-on-scroll');
                }
                
                const cardRect = card.getBoundingClientRect();
               
                const isCardVisible = cardRect.top < windowHeight + 400 && cardRect.bottom > -200;
                
                if (isCardVisible && !card.classList.contains('visible')) {
                  
                    card.classList.add('visible');
                } else if (!isCardVisible && !card.classList.contains('visible')) {
                   
                    observer.observe(card);
                }
            });
        } else {
           
            cards.forEach((card) => {
                if (!card.classList.contains('animate-on-scroll')) {
                    card.classList.add('animate-on-scroll');
                }
                if (!card.classList.contains('visible')) {
                    observer.observe(card);
                }
            });
        }
    }
    
    
    if (cards.length > 0) {
      
        const isPageAtTop = window.scrollY < 100;
        
        if (isPageAtTop && otdelInfo) {
            otdelInfo.classList.add('visible');
            
            cards.forEach((card, index) => {
               
                if (index < 3) {
                    card.classList.add('visible', 'animate-on-scroll');
                } else if (index < 6) {
                    card.classList.add('animate-on-scroll');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, (index - 3) * 100);
                } else {
                    card.classList.add('animate-on-scroll');
                    observer.observe(card);
                }
            });
        }
        
   
        requestAnimationFrame(function() {
            showVisibleCards();
        });
        
     
        setTimeout(showVisibleCards, 10);
        setTimeout(showVisibleCards, 50);
        setTimeout(showVisibleCards, 100);
        setTimeout(showVisibleCards, 200);
    }
    
 
    if (otdelInfo) {
        observer.observe(otdelInfo);
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        cards.forEach((card) => {
                            if (!card.classList.contains('visible') && checkInitialVisibility(card)) {
                                card.classList.add('visible');
                            }
                        });
                    }, 100);
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(otdelInfo);
    }

    addAnimationWithCheck('.card__photo, .card__map');

    addAnimationWithCheck('.slide img, .slide-photos img');

    addAnimationWithCheck('.video-wrapper');

    addAnimationWithCheck('.card p, .card h3, .card ul');

    function finalVisibilityCheck() {
        const allCards = document.querySelectorAll('.otdel__info .cards .card.animate-on-scroll:not(.visible)');
        allCards.forEach(card => {
            if (checkInitialVisibility(card)) {
                card.classList.add('visible');
            }
        });
        
        const allAnimated = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        allAnimated.forEach(el => {
            if (el.classList.contains('card')) return;
            
            if (checkInitialVisibility(el)) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    }

    setTimeout(finalVisibilityCheck, 50);
    setTimeout(finalVisibilityCheck, 150);
    
    if (document.readyState === 'complete') {
        setTimeout(finalVisibilityCheck, 200);
    } else {
        window.addEventListener('load', function() {
            setTimeout(finalVisibilityCheck, 200);
            setTimeout(finalVisibilityCheck, 500);
        });
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(finalVisibilityCheck, 100);
    });
    
    requestAnimationFrame(function() {
        setTimeout(finalVisibilityCheck, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const headerTop = document.querySelector('.header__top');
    
    if (headerTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                headerTop.classList.add('scrolled');
            } else {
                headerTop.classList.remove('scrolled');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const headerBottom = document.querySelector('.header__bottom');
    
    if (headerBottom) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = headerBottom.querySelector('.header');
            
            if (parallax && scrolled < headerBottom.offsetHeight) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                parallax.style.opacity = 1 - (scrolled / headerBottom.offsetHeight) * 0.5;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let current = 0;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
           
            slide.classList.remove('active', 'prev', 'next');
            
            if (i === idx) {
              
                slide.classList.add('active');
                slide.style.animation = 'slideInFromRight 0.8s ease-out';
            } else if (i === idx - 1 || (idx === 0 && i === slides.length - 1)) {
              
                slide.classList.add('prev');
            } else if (i === idx + 1 || (idx === slides.length - 1 && i === 0)) {
               
                slide.classList.add('next');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            current = (current - 1 + slides.length) % slides.length;
            showSlideWithDirection(current, 'left');
        });
        nextBtn.addEventListener('click', function () {
            current = (current + 1) % slides.length;
            showSlideWithDirection(current, 'right');
        });
    }
    
    function showSlideWithDirection(idx, direction) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-in-left', 'slide-in-right');
            slide.style.animation = 'none';
            
            if (i === idx) {
                slide.classList.add('active'); 
            
                slide.offsetHeight;
            
                setTimeout(() => {
                    if (direction === 'left') {
                        slide.style.animation = 'slideInFromLeft 0.8s ease-out';
                    } else {
                        slide.style.animation = 'slideInFromRight 0.8s ease-out';
                    }
                }, 10);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
