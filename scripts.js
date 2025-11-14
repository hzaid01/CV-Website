document.addEventListener('DOMContentLoaded', function() {
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {

    })
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    const mobileMenuButton = document.querySelector('nav button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    if (typeof feather !== 'undefined') feather.replace();
    
    // Loading scene
    const loadingText = document.getElementById('loading-text');
    const loadingPhoto = document.getElementById('loading-photo');
    const mainContent = document.getElementById('main-content');
    
    // Lightweight typewriter helper (used by photo intro)
    function typeWriter(text, element, delay = 80) {
        // If element is expected to contain multiple lines separated by \n, we
        // append text and insert <br> on newline for readability.
        element.textContent = "";
        let i = 0;
        const interval = setInterval(() => {
            const ch = text.charAt(i);
            if (ch === '\n') {
                element.appendChild(document.createElement('br'));
            } else {
                // append character node for better performance
                element.appendChild(document.createTextNode(ch));
            }
            i++;
            if (i >= text.length) clearInterval(interval);
        }, delay);
    }

    // Loading animation sequence (simpler and deterministic)
    setTimeout(() => {
        loadingText.classList.add('opacity-0');
        setTimeout(() => {
            loadingPhoto.classList.remove('opacity-0');
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
                mainContent.classList.remove('hidden');
                // initialize Vanta after content becomes visible
                if (typeof initVantaBackground === 'function') initVantaBackground();
            }, 1500);
        }, 1000);
    }, 2000);

    // Photo flip interaction removed (legacy) - simplified UX without flip

    // Scroll animation for skills title
    const skillsTitle = document.getElementById('skills-title');
    const skillsSection = document.getElementById('skills-section');
    
    window.addEventListener('scroll', function() {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            skillsTitle.style.opacity = '1';
            skillsTitle.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                skillsTitle.style.transform = 'scale(1)';
                setTimeout(() => {
                    skillsTitle.style.opacity = '0';
                }, 1000);
            }, 500);
            
            // Animate skill cards falling
            const skillCards = document.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fall-animation');
                }, index * 200);
            });
        }
    });

    // Animate skill bars when the About section enters the viewport
    (function animateSkillBarsOnView() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        // Find inner colored bars inside the gray track divs within #about
        const bars = Array.from(aboutSection.querySelectorAll('.w-full.bg-gray-200 > div'));
        if (!bars.length) return;

        // Record target widths and collapse to 0 for the animation start
        bars.forEach(b => {
            const inlineWidth = b.getAttribute('style') || '';
            // try extracting width from inline style (e.g. "width: 85%")
            const match = inlineWidth.match(/width:\s*([^;]+);?/i);
            const target = match ? match[1].trim() : (b.style.width || getComputedStyle(b).width);
            b.dataset.targetWidth = target;
            // ensure our animated class is present (so styles apply)
            b.classList.add('skill-fill');
            // collapse for initial state
            b.style.width = '0%';
        });

        // IntersectionObserver to trigger when about is visible
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bars.forEach(b => {
                        const w = b.dataset.targetWidth || '80%';
                        b.style.width = w;
                        // add subtle glow after fill
                        setTimeout(() => b.classList.add('glow'), 400);
                    });
                    obs.disconnect(); // animate only once
                }
            });
        }, { threshold: 0.3 });

        io.observe(aboutSection);
    })();

    // Skill card expansion
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            const descriptions = {
                'cpp': 'C++ — solid understanding of object-oriented programming and problem solving',
                'dsa': 'Data Structures & Algorithms — efficient problem solving and algorithmic thinking',
                'web': 'HTML & CSS — modern responsive web design and development',
                'python': 'Python — currently learning data science and automation scripting'
            };
            
            // Remove expanded class from all cards
            skillCards.forEach(c => c.classList.remove('expanded'));
            
            // Add expanded class to clicked card
            this.classList.add('expanded');
            
            // Typewriter effect for skill description with wrapping
            const originalHTML = this.innerHTML;
            const descContainer = document.createElement('div');
            descContainer.className = 'skill-desc text-sm md:text-base';
            this.innerHTML = '';
            this.appendChild(descContainer);

            // Type each character
            const fullText = descriptions[skill];
            let idx = 0;
            const interval = setInterval(() => {
                descContainer.textContent = fullText.slice(0, idx + 1);
                idx++;
                if (idx >= fullText.length) {
                    clearInterval(interval);
                    // after a pause, restore original card content
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.classList.remove('expanded');
                    }, 2000);
                }
            }, 30);
        });
    });

    // 3D tilt/hover effect helper
    function enable3DTilt(el, options = {}) {
        const strength = options.strength || 20;
        const scale = options.scale || 1.03;
        const onMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotY = (x - 0.5) * strength;
            const rotX = (0.5 - y) * strength;
            el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
            el.classList.add('card-shadow');
        };
        const onMouseLeave = () => {
            el.style.transform = '';
            el.classList.remove('card-shadow');
        };
        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);
    }

    // Apply 3D tilt and floating to photo and skill cards
    try {
        // Apply 3D tilt/floating to skill cards only
        skillCards.forEach(card => {
            card.classList.add('card-3d', 'floating', 'glass');
            enable3DTilt(card, { strength: 12, scale: 1.02 });
        });
    } catch (e) {
        // non-fatal
        console.warn('3D tilt init error', e);
    }

    // We no longer need explicit forwarding: the click handler is attached to the
    // outer card and works with transformed inner elements. If some browsers
    // still block, we could attach the same handler to the inner element too.


    // Hire me section
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const contactForm = document.getElementById('contact-form');
    const closeForm = document.getElementById('close-form');
    const hireForm = document.getElementById('hire-form');

    yesBtn.addEventListener('click', function() {
        contactForm.classList.remove('hidden');
    });

    noBtn.addEventListener('click', function() {
        if (typeof anime !== 'undefined') {
            anime({
                targets: noBtn,
                translateX: [0, 100, -100, 100, -100, 0],
                duration: 1000,
                easing: 'easeInOutQuart'
            });
        }
    });

    closeForm.addEventListener('click', function() {
        contactForm.classList.add('hidden');
    });

    hireForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Integration point: EmailJS / Formspree / backend
        alert('Thank you! Your message has been sent to Zaid Sohail.');
        contactForm.classList.add('hidden');
        this.reset();
    });

    // Vanta.js background
    function initVantaBackground() {
        if (typeof VANTA !== 'undefined' && VANTA.GLOBE) {
            VANTA.GLOBE({
                el: document.body,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x00ffff,
                backgroundColor: 0x0f172a,
                size: 0.8
            });
        }
    }
});
