document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Reveal for the Hub
    const hub = document.querySelector('.platform-hub');
    hub.style.opacity = '0';
    hub.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hub.style.transition = 'all 0.8s ease-out';
        hub.style.opacity = '1';
        hub.style.transform = 'translateY(0)';
    }, 200);

    // 2. Copyright Update
    const year = document.getElementById('copyright-year');
    if(year) year.textContent = new Date().getFullYear();

    // 3. Mobile Hamburger Logic (Simple version)
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active-mobile');
            // Add your mobile CSS for .active-mobile to show the menu
        });
    }

    // 4. POTW Submission
    const form = document.querySelector('.potw-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Solution logged. The leads will verify your proof.");
            form.reset();
        });
    }
});
