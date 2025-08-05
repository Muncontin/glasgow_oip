// Load navbar and footer, set active page
document.addEventListener('DOMContentLoaded', function() {
    // Inline navbar content (CORS-safe approach)
    const navbarHTML = `
        <header>
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo-placeholder">🌿</div>
                    <h1>Glasgow OIP<br><span class="subtitle">Accessibility Enhancement Project</span></h1>
                </div>
                <nav class="header-nav" id="headerNav">
                    <a href="index.html" data-page="index">Home</a>
                    <a href="overview.html" data-page="overview">Overview</a>
                    <a href="solutions.html" data-page="solutions">Solutions</a>
                    <a href="design-process.html" data-page="design-process">Design Process</a>=
                    <a href="reflection.html" data-page="reflection">Reflection</a>
                    <a href="portfolio.html" data-page="portfolio">Portfolio</a>
                    <a href="poster.html" data-page="poster">Poster</a>
                    <a href="team.html" data-page="team">Team</a>
                </nav>
                <div class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    `;
    
    // Inline footer content (CORS-safe approach)
    const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-logos">
                    <img src="images/sit-logo.png" alt="SIT Logo" class="footer-logo">
                    <img src="images/uofg-logo.svg" alt="University of Glasgow Logo" class="footer-logo">
                    <img src="images/friendsofthebotanicslogo.png" alt="Friends of the Botanics Logo" class="footer-logo">
                </div>
                <p>&copy; 2025 Glasgow OIP Team 3, Year 2 CS</p>
            </div>
        </footer>
    `;
    
    // Insert content directly (no fetch required)
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
    
    // Set active page
    setActivePage();
    
    // Initialize mobile navigation
    initMobileNav();
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