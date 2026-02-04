// NexusMeet Dashboard JS - Enhanced version for mobile & tablet
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('mobile-sidebar-toggle');
    const body = document.body;

    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        body.appendChild(overlay);
    }
    // Close button and overlay
    const closeSidebarBtn = document.querySelector('#close-sidebar');

    function toggleSidebar(isOpen) {
        if (isOpen) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar(true);
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar(false);
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => toggleSidebar(false));
    }

    // Close sidebar when clicking a menu item on mobile
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                toggleSidebar(false);
            }
        });
    });

    // Handle responsiveness
    const handleResize = () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            if (toggle) toggle.style.display = 'none';
        } else {
            if (toggle) toggle.style.display = 'block';
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Chart mock animation
    const bars = document.querySelectorAll('.chart-container div[style*="height"]');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        if (height && height !== '0') {
            bar.style.height = '0';
            setTimeout(() => {
                bar.style.transition = 'height 1s ease-out ' + (index * 0.1) + 's';
                bar.style.height = height;
            }, 100);
        }
    });

    // Logout confirmation (simple)
    const logoutBtn = document.querySelector('a[href*="login.html"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            }
        });
    }

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-toggle i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeIcons.forEach(icon => {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
});
