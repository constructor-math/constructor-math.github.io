document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle the navigation menu
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});