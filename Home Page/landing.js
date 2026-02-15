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
        const toggle = dropdown.querySelector('.nav-link') || dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            // On mobile, clicking the dropdown toggle should toggle the submenu
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
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
});