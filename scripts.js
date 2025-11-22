document.addEventListener('DOMContentLoaded', function () {
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {

    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling and active link highlighting
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    function changeLinkState() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    if (typeof feather !== 'undefined') feather.replace();


    // Photo flip interaction removed (legacy) - simplified UX without flip



    // Skill card expansion


    // We no longer need explicit forwarding: the click handler is attached to the
    // outer card and works with transformed inner elements. If some browsers
    // still block, we could attach the same handler to the inner element too.


    // Contact form

    const darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Vanta.js background


    // Download CV as PDF
    const downloadPdfButton = document.getElementById('download-pdf');
    downloadPdfButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = 'Zaid Sohail cv.pdf';
        link.download = 'Zaid_Sohail_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
