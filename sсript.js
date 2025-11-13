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
			// Убираем активные классы
			tabButtons.forEach(b => b.classList.remove('active'));
			tabContents.forEach(tc => {
				tc.classList.remove('active');
				tc.style.animation = 'none';
			});
			
			// Добавляем активный класс кнопке
			btn.classList.add('active');
			
			// Находим нужный контент
			const tabId = btn.getAttribute('data-tab');
			const targetContent = document.getElementById(tabId);
			
			// Принудительный рефлоу для сброса анимации
			targetContent.offsetHeight;
			
			// Добавляем активный класс с небольшой задержкой
			setTimeout(() => {
				targetContent.classList.add('active');
			}, 10);
		});
	});
});

// Анимации при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Убираем наблюдение после анимации для производительности
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Функция для проверки видимости элемента при загрузке
    function checkInitialVisibility(element) {
        // Используем requestAnimationFrame для более точной проверки после отрисовки
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Проверяем, виден ли элемент в области просмотра (с небольшим запасом сверху)
        // Учитываем, что элемент должен быть виден хотя бы на 10% своей высоты
        const elementHeight = rect.height || element.offsetHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercent = elementHeight > 0 ? (visibleHeight / elementHeight) * 100 : 0;
        
        return (
            rect.top < windowHeight + 100 && // Небольшой запас снизу
            rect.bottom > -100 && // Небольшой запас сверху
            rect.left < windowWidth &&
            rect.right > 0 &&
            visiblePercent > 5 // Элемент должен быть виден хотя бы на 5%
        );
    }

    // Функция для добавления анимации с проверкой начальной видимости
    function addAnimationWithCheck(selector, animationClass = 'animate-on-scroll', useRAF = true) {
        const elements = document.querySelectorAll(selector);
        
        const processElements = function() {
            elements.forEach((el, index) => {
                el.classList.add(animationClass);
                
                // Проверяем, виден ли элемент сразу
                if (checkInitialVisibility(el)) {
                    // Если элемент уже виден, добавляем класс visible сразу
                    el.classList.add('visible');
                } else {
                    // Если элемент не виден, наблюдаем за ним
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

    // Добавляем классы анимации к основным секциям
    const animatedElements = document.querySelectorAll('.information, .video-section, .slider-section, .tabs, footer, .otdel__info');
    
    // Используем requestAnimationFrame для секций, чтобы они проверялись после отрисовки
    requestAnimationFrame(function() {
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            if (checkInitialVisibility(el)) {
                // Секция видна сразу - делаем её видимой сразу
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    });

    // Анимации для подэлементов с разными типами
    addAnimationWithCheck('.hist, .put, .slide-photos, .tab-content');

    // Анимации для заголовков
    addAnimationWithCheck('.information h2, .video-section h2, .slider-section h2, .otdel__info h2');

    // Анимации для карточек - это критично для страницы chram.html
    const otdelInfo = document.querySelector('.otdel__info');
    const cards = document.querySelectorAll('.otdel__info .cards .card');
    
    // Функция для показа карточек в видимой секции
    function showVisibleCards() {
        if (!otdelInfo || cards.length === 0) return;
        
        // Получаем координаты секции
        const sectionRect = otdelInfo.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Проверяем, находится ли секция в видимой области (даже частично)
        const sectionVisible = sectionRect.top < windowHeight + 300 && sectionRect.bottom > -100;
        
        if (sectionVisible) {
            // Если секция видна (даже частично), добавляем класс visible к секции
            otdelInfo.classList.add('visible');
            
            // Показываем все карточки, которые находятся в видимой области или близко к ней
            cards.forEach((card) => {
                if (!card.classList.contains('animate-on-scroll')) {
                    card.classList.add('animate-on-scroll');
                }
                
                const cardRect = card.getBoundingClientRect();
                // Более либеральная проверка: карточка видна, если она находится выше нижней границы окна + запас
                const isCardVisible = cardRect.top < windowHeight + 400 && cardRect.bottom > -200;
                
                if (isCardVisible && !card.classList.contains('visible')) {
                    // Если карточка видна, показываем её немедленно
                    card.classList.add('visible');
                } else if (!isCardVisible && !card.classList.contains('visible')) {
                    // Если карточка не видна, наблюдаем за ней
                    observer.observe(card);
                }
            });
        } else {
            // Если секция не видна, добавляем класс animate-on-scroll и наблюдаем за карточками
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
    
    // Немедленная проверка для карточек (критично для chram.html)
    if (cards.length > 0) {
        // Если страница в верхней части (начало страницы), показываем элементы сразу
        const isPageAtTop = window.scrollY < 100;
        
        if (isPageAtTop && otdelInfo) {
            // На странице chram.html секция обычно начинается сразу после header
            // Показываем секцию сразу
            otdelInfo.classList.add('visible');
            
            // Показываем первые несколько карточек сразу без задержки
            cards.forEach((card, index) => {
                // Для первых карточек добавляем класс visible ПЕРЕД animate-on-scroll,
                // чтобы избежать момента, когда элемент становится невидимым
                if (index < 3) {
                    // Добавляем visible сразу, затем animate-on-scroll
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
        
        // Используем requestAnimationFrame для более точной проверки после отрисовки
        requestAnimationFrame(function() {
            showVisibleCards();
        });
        
        // Множественные проверки для гарантии
        setTimeout(showVisibleCards, 10);
        setTimeout(showVisibleCards, 50);
        setTimeout(showVisibleCards, 100);
        setTimeout(showVisibleCards, 200);
    }
    
    // Наблюдаем за самой секцией, чтобы при её появлении показывать карточки
    if (otdelInfo) {
        observer.observe(otdelInfo);
        
        // Когда секция становится видимой, проверяем карточки
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Секция стала видимой - показываем все видимые карточки
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

    // Анимации для изображений в карточках
    addAnimationWithCheck('.card__photo, .card__map');

    // Анимации для изображений в слайдере
    addAnimationWithCheck('.slide img, .slide-photos img');

    // Анимации для видео
    addAnimationWithCheck('.video-wrapper');

    // Анимации для параграфов в карточках
    addAnimationWithCheck('.card p, .card h3, .card ul');

    // Дополнительная проверка после загрузки страницы
    function finalVisibilityCheck() {
        // Особое внимание к карточкам на странице chram.html
        const allCards = document.querySelectorAll('.otdel__info .cards .card.animate-on-scroll:not(.visible)');
        allCards.forEach(card => {
            if (checkInitialVisibility(card)) {
                card.classList.add('visible');
            }
        });
        
        // Проверяем другие элементы
        const allAnimated = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        allAnimated.forEach(el => {
            // Пропускаем карточки, они уже обработаны
            if (el.classList.contains('card')) return;
            
            if (checkInitialVisibility(el)) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    }

    // Проверка после небольшой задержки (двойная для надежности)
    setTimeout(finalVisibilityCheck, 50);
    setTimeout(finalVisibilityCheck, 150);
    
    // Проверка после полной загрузки страницы
    if (document.readyState === 'complete') {
        setTimeout(finalVisibilityCheck, 200);
    } else {
        window.addEventListener('load', function() {
            setTimeout(finalVisibilityCheck, 200);
            // Дополнительная проверка после загрузки
            setTimeout(finalVisibilityCheck, 500);
        });
    }
    
    // Дополнительная проверка при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(finalVisibilityCheck, 100);
    });
    
    // Финальная проверка через requestAnimationFrame для гарантии
    requestAnimationFrame(function() {
        setTimeout(finalVisibilityCheck, 100);
    });
});

// Эффект изменения header при прокрутке
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

// Параллакс эффект для header
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

// Улучшенные анимации для слайдера
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let current = 0;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            // Убираем все классы состояний
            slide.classList.remove('active', 'prev', 'next');
            
            if (i === idx) {
                // Активный слайд
                slide.classList.add('active');
                slide.style.animation = 'slideInFromRight 0.8s ease-out';
            } else if (i === idx - 1 || (idx === 0 && i === slides.length - 1)) {
                // Предыдущий слайд
                slide.classList.add('prev');
            } else if (i === idx + 1 || (idx === slides.length - 1 && i === 0)) {
                // Следующий слайд
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
            // Убираем все классы и анимации
            slide.classList.remove('active', 'slide-in-left', 'slide-in-right');
            slide.style.animation = 'none';
            
            if (i === idx) {
                // Активный слайд
                slide.classList.add('active');
                
                // Принудительный рефлоу для сброса анимации
                slide.offsetHeight;
                
                // Добавляем анимацию через inline стили
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

// Плавная прокрутка для навигации
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

// Анимация загрузки страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
