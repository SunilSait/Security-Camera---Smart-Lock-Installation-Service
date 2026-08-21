/* ===== SECURITY CAMERA & SMART LOCK — SHARED COMPONENTS ===== */
'use strict';

/* ─── THEME & DIRECTION ─────────────────────────────────────────── */
(function initThemeDir() {
    const html = document.documentElement;
    const saved = localStorage.getItem('securitycam_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('securitycam_dir') === 'rtl') html.setAttribute('dir', 'rtl');
})();

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('securitycam_theme', html.classList.contains('dark') ? 'dark' : 'light');
    document.querySelectorAll('[id$="-theme-icon"]').forEach(updateThemeIcon);
}
function updateThemeIcon(el) {
    if (!el) return;
    el.className = document.documentElement.classList.contains('dark')
        ? 'fas fa-sun text-sm text-[#2EC4B6]'
        : 'fas fa-moon text-sm text-slate-500 dark:text-slate-400';
}
function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('securitycam_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('[id$="-dir-btn"]').forEach(btn => {
        btn.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

/* ─── NAVBAR INJECTION ─────────────────────────────────────────── */
function injectNav() {
    const el = document.getElementById('main-nav');
    if (!el) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html', label: 'Home' },
        { href: 'home2.html', label: 'Home 2' },
        { href: 'about.html', label: 'About' },
        { href: 'services.html', label: 'Services' },
        { href: 'pricing.html', label: 'Pricing' },
        { href: 'contact.html', label: 'Contact' },
    ];

    const navLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        const activeClass = isActive ? 'text-[#1A3A5C] dark:text-[#2EC4B6] font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:text-[#1A3A5C] dark:hover:text-[#2EC4B6]';
        return `<a href="${l.href}" class="${activeClass} font-semibold text-sm transition-colors relative group">
            ${l.label}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2EC4B6] transition-all group-hover:w-full ${isActive ? 'w-full' : ''}"></span>
        </a>`;
    }).join('');

    el.innerHTML = `
    <nav class="bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-md border-b border-slate-100 dark:border-[#30363D] fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-3 shrink-0 logo-bounce" aria-label="SecureVista Home">
                    <div class="relative w-10 h-10 shrink-0">
                        <img src="favicon.svg" alt="SecureVista Logo" class="w-10 h-10 rounded-xl object-cover shadow-lg" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                        <div style="display:none;" class="w-10 h-10 bg-[#1A3A5C] rounded-xl items-center justify-center shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M50 10 L80 25 L80 55 C80 70 67 82 50 90 C33 82 20 70 20 55 L20 25 Z" stroke="white" stroke-width="4" fill="none"/>
                                <rect x="40" y="50" width="20" height="16" rx="2" fill="white" opacity="0.9"/>
                                <path d="M44 50 L44 43 C44 38 47 35 50 35 C53 35 56 38 56 43 L56 50" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col leading-none">
                        <span class="font-black text-slate-900 dark:text-white text-base tracking-tight" style="font-family:'Poppins',sans-serif;">SECURE</span>
                        <span class="font-bold text-[#2EC4B6] text-[10px] tracking-[0.2em] uppercase">Vista Security</span>
                    </div>
                </a>

                <!-- Desktop Nav -->
                <div class="hidden xl:flex items-center gap-5">
                    ${navLinksHTML}
                </div>

                <!-- Right CTAs + Icons -->
                <div class="flex items-center gap-2">
                    <!-- RTL Toggle -->
                    <button id="nav-dir-btn" onclick="toggleDir()" class="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] text-[10px] font-black text-slate-600 dark:text-slate-400 hover:border-[#2EC4B6]/50 transition-all" title="Toggle Direction">${document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR'}</button>
                    <!-- Dark Mode -->
                    <button onclick="toggleTheme()" class="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] hover:border-[#2EC4B6]/50 transition-all" title="Toggle Theme" aria-label="Toggle dark mode">
                        <i id="nav-theme-icon" class="${document.documentElement.classList.contains('dark') ? 'fas fa-sun text-sm text-[#2EC4B6]' : 'fas fa-moon text-sm text-slate-500'}"></i>
                    </button>
                    <!-- CTAs -->
                    <a href="login.html" class="hidden xl:inline-flex btn-secondary text-xs px-4 h-9 items-center justify-center">Login</a>
                    <a href="quote.html" class="hidden xl:inline-flex btn-primary text-xs px-4 h-9 items-center justify-center ${page === 'quote.html' ? 'ring-2 ring-[#2EC4B6] ring-offset-2 dark:ring-offset-[#0D1117]' : ''}">Get Free Quote</a>
                    <!-- Mobile Hamburger -->
                    <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] transition-colors" aria-label="Open menu">
                        <i class="fas fa-bars text-slate-600 dark:text-slate-300"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Backdrop -->
        <div id="mobile-backdrop" onclick="toggleMobileMenu()" class="hidden xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-16"></div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden xl:hidden absolute top-full left-0 right-0 w-full bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-[#30363D] shadow-2xl z-50">
            <div class="px-4 py-5 flex flex-col gap-1 max-w-7xl mx-auto">
                ${links.map(l => {
                    const isActive = page === l.href;
                    return `<a href="${l.href}" class="block px-4 py-3 rounded-xl text-sm font-semibold ${isActive ? 'bg-[#1A3A5C] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#161B22]'} transition-colors">${l.label}</a>`;
                }).join('')}
                <div class="mt-3 pt-3 border-t border-slate-100 dark:border-[#30363D] flex flex-col gap-2">
                    <a href="quote.html" class="btn-primary text-xs h-11 flex items-center justify-center text-center w-full">Get Free Quote</a>
                    <a href="login.html" class="btn-secondary text-xs h-11 flex items-center justify-center text-center w-full">Login</a>
                </div>
                <div class="flex items-center gap-2 mt-3 justify-center">
                    <button id="mob-dir-btn" onclick="toggleDir()" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] text-[10px] font-black text-slate-600 dark:text-slate-400">${document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR'}</button>
                    <button onclick="toggleTheme()" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D]">
                        <i id="mob-theme-icon" class="${document.documentElement.classList.contains('dark') ? 'fas fa-sun text-sm text-[#2EC4B6]' : 'fas fa-moon text-sm text-slate-500'}"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btnIcon = document.querySelector('#mobile-menu-btn i');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
        if (btnIcon) btnIcon.className = 'fas fa-xmark text-slate-600 dark:text-slate-300';
    } else {
        menu.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
        if (btnIcon) btnIcon.className = 'fas fa-bars text-slate-600 dark:text-slate-300';
    }
}

// Close mobile menu on click outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btn = document.getElementById('mobile-menu-btn');
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        menu.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
        const btnIcon = document.querySelector('#mobile-menu-btn i');
        if (btnIcon) btnIcon.className = 'fas fa-bars text-slate-600 dark:text-slate-300';
    }
});

/* ─── FOOTER INJECTION ─────────────────────────────────────────── */
function injectFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="bg-[#0b0c10] text-white pt-16 pb-8 border-t border-white/5" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <!-- Column 1: Brand -->
                <div>
                    <a href="index.html" class="flex items-center gap-3 mb-6" aria-label="SecureVista Home">
                        <div class="relative w-10 h-10 shrink-0">
                            <img src="favicon.svg" alt="SecureVista Logo" class="w-10 h-10 rounded-xl object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                            <div style="display:none;" class="w-10 h-10 bg-[#1A3A5C] rounded-xl items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M50 10 L80 25 L80 55 C80 70 67 82 50 90 C33 82 20 70 20 55 L20 25 Z" stroke="white" stroke-width="4" fill="none"/>
                                    <rect x="40" y="50" width="20" height="16" rx="2" fill="white" opacity="0.9"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-col leading-none">
                            <span class="font-black text-white text-base tracking-tight" style="font-family:'Poppins',sans-serif;">SECURE</span>
                            <span class="font-bold text-[#2EC4B6] text-[10px] tracking-[0.2em] uppercase">Vista Security</span>
                        </div>
                    </a>
                    <p class="text-slate-400 text-sm leading-relaxed mb-6">
                        Professional security camera & smart lock installation services. Protecting homes and businesses with cutting-edge smart security solutions.
                    </p>
                    <div class="flex items-center gap-3">
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Facebook"><i class="fab fa-facebook-f text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><i class="fab fa-instagram text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="YouTube"><i class="fab fa-youtube text-sm"></i></a>
                        <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white text-slate-400 hover:text-white transition-colors" aria-label="Twitter"><i class="fab fa-x-twitter text-sm"></i></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div>
                    <h3 class="font-black text-xs uppercase tracking-widest text-white mb-6" style="font-family:'Poppins',sans-serif;">Quick Links</h3>
                    <ul class="space-y-3">
                        <li><a href="index.html" class="text-slate-400 hover:text-white text-sm transition-colors">Home</a></li>
                        <li><a href="home2.html" class="text-slate-400 hover:text-white text-sm transition-colors">Home 2 — Premium</a></li>
                        <li><a href="about.html" class="text-slate-400 hover:text-white text-sm transition-colors">About Us</a></li>
                        <li><a href="services.html" class="text-slate-400 hover:text-white text-sm transition-colors">Our Services</a></li>
                        <li><a href="pricing.html" class="text-slate-400 hover:text-white text-sm transition-colors">Pricing Plans</a></li>
                        <li><a href="contact.html" class="text-slate-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div>
                    <h3 class="font-black text-xs uppercase tracking-widest text-white mb-6" style="font-family:'Poppins',sans-serif;">Resources</h3>
                    <ul class="space-y-3">
                        <li><a href="coming-soon.html" class="text-slate-400 hover:text-white text-sm transition-colors">Coming Soon</a></li>
                        <li><a href="coming-soon.html" class="text-slate-400 hover:text-white text-sm transition-colors">Blog & Security Tips</a></li>
                        <li><a href="coming-soon.html" class="text-slate-400 hover:text-white text-sm transition-colors">FAQs</a></li>
                        <li><a href="404.html" class="text-slate-400 hover:text-white text-sm transition-colors">404 Page</a></li>
                        <li><a href="login.html" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a></li>
                        <li><a href="signup.html" class="text-slate-400 hover:text-white text-sm transition-colors">Create Account</a></li>
                    </ul>
                </div>

                <!-- Column 4: Stay Updated -->
                <div>
                    <div class="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
                        <h3 class="font-black text-base text-white mb-2" style="font-family:'Poppins',sans-serif;">Stay Protected</h3>
                        <p class="text-slate-400 text-xs leading-relaxed mb-4">
                            Subscribe for security tips, new product launches & exclusive installation discounts.
                        </p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed successfully!'); this.reset();" class="space-y-3">
                            <input type="email" placeholder="your@email.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none text-white placeholder-slate-500" required>
                            <button type="submit" class="w-full bg-[#1A3A5C] hover:bg-[#14304D] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-slate-500 text-xs">&copy; ${new Date().getFullYear()} SECUREVISTA SECURITY. ALL RIGHTS RESERVED.</p>
                <div class="flex items-center gap-6 text-slate-500 text-xs">
                    <a href="#" class="hover:text-white transition-colors">PRIVACY</a>
                    <a href="#" class="hover:text-white transition-colors">TERMS</a>
                    <a href="tel:+919876543210" class="hover:text-white transition-colors">+91 98765 43210</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* ─── BACK TO TOP ─────────────────────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── SCROLL REVEAL ───────────────────────────────────────────── */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
}

/* ─── COUNTER ANIMATION ───────────────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current.toLocaleString() + suffix;
                if (current >= target) clearInterval(timer);
            }, 25);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
}

/* ─── ACCORDION ───────────────────────────────────────────────── */
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.acc-icon');
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content.open').forEach(el => {
        el.classList.remove('open');
        const prevIcon = el.previousElementSibling.querySelector('.acc-icon');
        if (prevIcon) prevIcon.style.transform = 'rotate(0deg)';
    });
    if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

/* ─── SPOTLIGHT EFFECT ────────────────────────────────────────── */
function initSpotlight() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });
}

/* ─── CONTACT FORM ────────────────────────────────────────────── */
function submitContactForm(e) {
    e.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const success = document.getElementById('contact-success');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Sending...'; btn.disabled = true; }
    setTimeout(() => {
        if (btn) btn.style.display = 'none';
        if (success) success.classList.remove('hidden');
        e.target.reset();
    }, 1500);
}

/* ─── AUTH HELPERS ────────────────────────────────────────────── */
function togglePwd(inputId, iconId) {
    const inp = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    if (icon) icon.className = inp.type === 'password' ? 'fas fa-eye text-sm' : 'fas fa-eye-slash text-sm';
}
function submitLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Signing in...'; btn.disabled = true; }
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}
function submitSignup(e) {
    e.preventDefault();
    const btn = document.getElementById('signup-btn');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Creating Account...'; btn.disabled = true; }
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
}
function toggleAuthTheme() {
    toggleTheme();
    const icon = document.getElementById('auth-theme-icon');
    if (icon) updateThemeIcon(icon);
}
function toggleAuthDir() {
    toggleDir();
    const btn = document.getElementById('auth-dir-btn');
    if (btn) btn.textContent = document.documentElement.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
}

/* ─── STICKY NAV SCROLL STATE ─────────────────────────────────── */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ─── NOTIFY FORM (Coming Soon) ──────────────────────────────── */
function submitNotify(e) {
    e.preventDefault();
    const success = document.getElementById('notify-success');
    const input = document.getElementById('notify-email');
    if (success) success.classList.remove('hidden');
    if (input) input.value = '';
}

/* ─── CONSULTATION FORM ──────────────────────────────────────── */
function submitConsultation(e) {
    e.preventDefault();
    const btn = document.getElementById('consultation-submit-btn');
    const success = document.getElementById('consultation-success');
    if (btn) { btn.innerHTML = '<i class="fas fa-circle-notch animate-spin-slow"></i> Booking...'; btn.disabled = true; }
    setTimeout(() => {
        if (btn) btn.style.display = 'none';
        if (success) success.classList.remove('hidden');
        e.target.reset();
    }, 1500);
}

/* ─── HERO AUTO SLIDER ────────────────────────────────────────── */
function initHeroAutoSlider() {
    const slides = document.querySelectorAll('.hero-slide-item');
    const dots = document.querySelectorAll('.hero-slider-dot');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    if (!slides.length) return;

    let currentIndex = 0;
    let autoTimer = null;
    const intervalTime = 3800;

    function showSlide(index) {
        if (index < 0) { currentIndex = slides.length - 1; }
        else if (index >= slides.length) { currentIndex = 0; }
        else { currentIndex = index; }

        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    function startAutoPlay() {
        stopAutoPlay();
        autoTimer = setInterval(nextSlide, intervalTime);
    }
    function stopAutoPlay() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(idx);
            startAutoPlay();
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            startAutoPlay();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            startAutoPlay();
        });
    }

    showSlide(0);
    startAutoPlay();
}

/* ─── PACKAGE FINDER ──────────────────────────────────────────── */
function initPackageFinder() {
    const container = document.getElementById('package-finder');
    const grid = document.getElementById('package-grid');
    if (!container || !grid) return;

    let selectedType = 'residential';
    const typeBtns = container.querySelectorAll('[data-pkg-type]');

    const packageData = {
        'residential': [
            {
                tier: 'Basic',
                name: 'Home Starter',
                price: '₹14,999',
                desc: 'Essential smart protection for small homes & flats',
                icon: 'fa-shield-halved',
                popular: false,
                features: [
                    '2 HD 1080p Cameras',
                    '1 Smart Digital Lock',
                    'Basic Alarm Hub',
                    'Mobile App Live Access',
                    'Standard Installation',
                    '1-Year Product Warranty'
                ]
            },
            {
                tier: 'Standard',
                name: 'Home Shield',
                price: '₹29,999',
                desc: 'Complete full-property security with smart alerts',
                icon: 'fa-shield-halved',
                popular: true,
                badge: 'Most Popular',
                features: [
                    '4 HD 2K QHD Cameras',
                    '2 Smart Touch Locks',
                    'Advanced Alarm System',
                    '1 Video Doorbell with Chime',
                    '24/7 Cloud Recording',
                    'Priority Installation & Setup',
                    '2-Year Comprehensive Warranty'
                ]
            },
            {
                tier: 'Premium',
                name: 'Home Fortress',
                price: '₹54,999',
                desc: 'Ultimate whole-home multi-layer protection suite',
                icon: 'fa-building-shield',
                popular: false,
                badge: 'Maximum Security',
                features: [
                    '8 4K Ultra-HD Cameras',
                    '4 Biometric Fingerprint Locks',
                    'Full Multi-Sensor Alarm',
                    '2 Video Doorbells',
                    'NVR + Cloud Dual Storage',
                    'AI Motion & Person Detection',
                    'Lifetime Dedicated Support'
                ]
            }
        ],
        'commercial': [
            {
                tier: 'Basic',
                name: 'Office Guard',
                price: '₹49,999',
                desc: 'Essential business surveillance & access control',
                icon: 'fa-shield-halved',
                popular: false,
                features: [
                    '4 HD Business Cameras',
                    '2 Access Control Locks',
                    'Fire & Smoke Integration',
                    'Visitor Management App',
                    'Standard Professional Setup',
                    '1-Year Business Support'
                ]
            },
            {
                tier: 'Standard',
                name: 'Business Shield',
                price: '₹99,999',
                desc: 'Comprehensive multi-zone commercial security',
                icon: 'fa-shield-halved',
                popular: true,
                badge: 'Best Value',
                features: [
                    '8 4K Ultra-HD Cameras',
                    '4 Biometric & RFID Locks',
                    'Multi-zone Siren Alarm',
                    'ANPR Vehicle Recognition',
                    '90-Day Cloud Storage',
                    'Priority SLA Support',
                    'Quarterly Health Checks'
                ]
            },
            {
                tier: 'Premium',
                name: 'Enterprise Vault',
                price: '₹1,99,999',
                desc: 'Enterprise-grade security & monitoring infrastructure',
                icon: 'fa-building-shield',
                popular: false,
                badge: 'Enterprise Grade',
                features: [
                    '16+ 4K Ultra-HD Cameras',
                    'Biometric + RFID Access Hub',
                    'AI Facial & Object Analytics',
                    'Perimeter Radar Detection',
                    'Dedicated NVR Server Cluster',
                    '24/7 SLA-backed NOC Support',
                    'Annual Maintenance Contract'
                ]
            }
        ]
    };

    function renderPackages() {
        const packages = packageData[selectedType] || packageData['residential'];
        grid.innerHTML = packages.map((pkg) => {
            const isPop = pkg.popular;
            return `
            <div class="bg-white dark:bg-[#0D1117] rounded-3xl ${isPop ? 'pricing-popular ring-2 ring-[#2EC4B6]' : 'border border-slate-200 dark:border-[#30363D]'} p-8 text-center card-hover flex flex-col relative transition-all duration-300">
                ${isPop ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2"><span class="badge bg-[#2EC4B6] text-white px-4 py-1 text-xs font-black shadow-lg shadow-[#2EC4B6]/30 uppercase tracking-wider rounded-full">${pkg.badge || 'Most Popular'}</span></div>` : ''}
                
                <div class="w-14 h-14 rounded-2xl ${isPop ? 'bg-[#2EC4B6]/15 text-[#2EC4B6]' : 'bg-slate-100 dark:bg-[#161B22] text-slate-500 dark:text-slate-400'} flex items-center justify-center mx-auto mb-4 text-xl">
                    <i class="fas ${pkg.icon}"></i>
                </div>
                
                <span class="text-xs font-extrabold uppercase tracking-widest text-[#2EC4B6] mb-1">${pkg.tier}</span>
                <h3 class="font-black text-2xl text-slate-900 dark:text-white mb-2" style="font-family:'Poppins',sans-serif;">${pkg.name}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs mb-6 min-h-[32px]">${pkg.desc}</p>
                
                <div class="mb-6 pb-6 border-b border-slate-100 dark:border-[#30363D]">
                    <div class="text-4xl font-black ${isPop ? 'text-[#2EC4B6]' : 'text-slate-900 dark:text-white'}">${pkg.price}</div>
                    <div class="text-slate-400 text-xs mt-1 font-medium">all-inclusive installation</div>
                </div>
                
                <ul class="space-y-3 mb-8 flex-grow text-left">
                    ${pkg.features.map(f => `
                        <li class="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <i class="fas fa-check text-[#2EC4B6] text-xs flex-shrink-0"></i>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
                
                <a href="contact.html" class="${isPop ? 'btn-primary' : 'btn-secondary'} w-full py-3.5 text-xs font-bold uppercase tracking-wider">
                    Get ${pkg.tier} Plan <i class="fas fa-arrow-right text-[10px] ml-1"></i>
                </a>
            </div>
            `;
        }).join('');
    }

    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            typeBtns.forEach(b => {
                b.classList.remove('active', 'bg-[#1A3A5C]', 'text-white', 'shadow-md');
                b.classList.add('text-slate-600', 'dark:text-slate-300');
            });
            btn.classList.add('active', 'bg-[#1A3A5C]', 'text-white', 'shadow-md');
            btn.classList.remove('text-slate-600', 'dark:text-slate-300');
            selectedType = btn.dataset.pkgType;
            renderPackages();
        });
    });

    renderPackages();
}

/* ─── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    injectNav();
    injectFooter();
    initNavbarScroll();
    initBackToTop();
    initScrollReveal();
    initCounters();
    initSpotlight();
    initHeroAutoSlider();
    initPackageFinder();
});
