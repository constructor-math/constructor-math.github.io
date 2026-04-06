document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');

    const navLinks = document.querySelector('.nav-links');

    const dropdowns = document.querySelectorAll('.dropdown');



    // ── Hamburger open/close ──────────────────────────────────────────────────

    hamburger.addEventListener('click', () => {

        navLinks.classList.toggle('active');

        // Close all dropdowns when closing the menu

        if (!navLinks.classList.contains('active')) {

            dropdowns.forEach(d => d.classList.remove('active'));

        }

    });



    // ── Dropdown toggle on mobile ─────────────────────────────────────────────

    dropdowns.forEach(dropdown => {

        const toggleArrow = dropdown.querySelector('.dropdown-toggle-mobile');

        const toggleLabel = dropdown.querySelector('.dropdown-toggle'); // the text label



        const handleToggle = (e) => {

            if (window.innerWidth > 768) return; // desktop: CSS hover handles it

            e.preventDefault();

            e.stopPropagation();



            const isOpen = dropdown.classList.contains('active');



            // Close all dropdowns first

            dropdowns.forEach(d => d.classList.remove('active'));



            // Then open this one if it wasn't already open

            if (!isOpen) {

                dropdown.classList.add('active');

            }

        };



        // Clicking the ▼ arrow toggles dropdown

        if (toggleArrow) {

            toggleArrow.addEventListener('click', handleToggle);

            toggleArrow.addEventListener('touchstart', handleToggle, { passive: false });

        }



        // Clicking the label (e.g. "Events") with no href also toggles dropdown

        if (toggleLabel && !toggleLabel.getAttribute('href')) {

            toggleLabel.addEventListener('click', handleToggle);

            toggleLabel.addEventListener('touchstart', handleToggle, { passive: false });

        }

    });



    // ── Close menu when a non-toggle nav link is clicked ─────────────────────

    document.querySelectorAll('.nav-links a').forEach(link => {

        link.addEventListener('click', () => {

            if (!link.classList.contains('dropdown-toggle') || link.getAttribute('href')) {

                navLinks.classList.remove('active');

                dropdowns.forEach(d => d.classList.remove('active'));

            }

        });

    });



    // ── Highlight active page ─────────────────────────────────────────────────

    const currentPage = window.location.pathname.split('/').pop() || 'landing.html';

    document.querySelectorAll('.nav-link').forEach(link => {

        const href = link.getAttribute('href');

        if (!href) return;

        if (href.split('/').pop() === currentPage) {

            link.classList.add('active');

        }

    });



    // ── Auto-update copyright year ────────────────────────────────────────────

    const copyrightYear = document.getElementById('copyright-year');

    if (copyrightYear) {

        copyrightYear.textContent = new Date().getFullYear();

    }

});
