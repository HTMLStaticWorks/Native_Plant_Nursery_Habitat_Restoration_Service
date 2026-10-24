function initApp() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    function openMenu() {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('active');
      document.body.classList.add('overflow-hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      if (window.lucide) lucide.createIcons();
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (window.lucide) lucide.createIcons();
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280 && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Dark/Light Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || document.documentElement.getAttribute('data-theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    });
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Initialize theme
  setTheme(initialTheme);

  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const currentDir = localStorage.getItem('dir');
  if (currentDir) {
    document.documentElement.setAttribute('dir', currentDir);
  }

  rtlToggles.forEach(rtlToggle => {
    rtlToggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      let newDir = dir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize AOS
  if (window.AOS) {
    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: 'ease-out-cubic'
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Run immediately if ready, else wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
