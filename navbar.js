// Load navbar and footer, set active page
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Set active page
            setActivePage();
            
            // Initialize mobile navigation
            initMobileNav();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = currentPage.replace('.html', '');
    
    const navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageKey) {
            link.classList.add('active');
        }
    });
}

function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const headerNav = document.getElementById('headerNav');
    
    if (navToggle && headerNav) {
        navToggle.addEventListener('click', function() {
            headerNav.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile nav when clicking on a link
        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                headerNav.classList.remove('nav-open');
                navToggle.classList.remove('active');
            });
        });
    }
}