document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle the navigation menu
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (except dropdown toggle)
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close menu if it's a dropdown toggle on mobile
            if (!link.classList.contains('dropdown-toggle')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle-mobile');
        const link = dropdown.querySelector('.nav-link');
        
        if (toggle) {
            // On mobile, clicking the arrow toggles the dropdown
            const handleDropdownToggle = (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            };
            
            toggle.addEventListener('click', handleDropdownToggle);
            toggle.addEventListener('touchstart', handleDropdownToggle, { passive: false });
        }
        
        // Make sure the link itself still works normally
        if (link) {
            link.addEventListener('click', (e) => {
                // Only prevent default if we're on desktop (where we don't want dropdown behavior)
                // On mobile, let the link work normally
                if (window.innerWidth > 768) {
                    // Let the link work normally on desktop
                    return;
                }
                // On mobile, the link also works normally now - only the arrow toggles dropdown
            });
        }
    });

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'landing.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Auto-update copyright year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});