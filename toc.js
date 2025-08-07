// Table of Contents functionality
class TableOfContents {
    constructor() {
        this.headers = [];
        this.sidebar = null;
        this.toggle = null;
        this.isVisible = true;
        this.activeLink = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.collectHeaders();
        if (this.headers.length > 0) {
            this.createSidebar();
            this.createToggle();
            this.bindEvents();
            this.updateActiveLink();
            document.body.classList.add('has-toc');
        }
    }
    
    collectHeaders() {
        // Get only h2 headers that have text content
        const headerSelectors = 'h2';
        const allHeaders = document.querySelectorAll(headerSelectors);
        
        this.headers = Array.from(allHeaders).filter(header => {
            // Skip headers that are empty or only contain whitespace
            const text = header.textContent.trim();
            if (!text) return false;
            
            // Skip headers inside navigation or footer
            const isInNav = header.closest('nav, .navbar, #navbar-placeholder, footer, #footer-placeholder');
            if (isInNav) return false;
            
            return true;
        }).map((header, index) => {
            // Ensure header has an ID for linking
            if (!header.id) {
                header.id = this.generateId(header.textContent, index);
            }
            
            return {
                element: header,
                text: header.textContent.trim(),
                level: parseInt(header.tagName.charAt(1)),
                id: header.id
            };
        });
    }
    
    generateId(text, index) {
        // Create a URL-friendly ID from the header text
        let id = text.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        
        // Ensure uniqueness
        if (document.getElementById(id)) {
            id += `-${index}`;
        }
        
        return id || `header-${index}`;
    }
    
    createSidebar() {
        this.sidebar = document.createElement('div');
        this.sidebar.className = 'toc-sidebar';
        this.sidebar.innerHTML = `
            <div class="toc-title">Table of Contents</div>
            <ul class="toc-list">
                ${this.headers.map(header => `
                    <li class="toc-item">
                        <a href="#${header.id}" class="toc-link" data-target="${header.id}">
                            ${header.text}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
        
        document.body.appendChild(this.sidebar);
    }
    
    createToggle() {
        this.toggle = document.createElement('button');
        this.toggle.className = 'toc-toggle';
        this.toggle.innerHTML = '📋';
        this.toggle.title = 'Toggle Table of Contents';
        this.toggle.setAttribute('aria-label', 'Toggle Table of Contents');
        
        document.body.appendChild(this.toggle);
    }
    
    bindEvents() {
        // Toggle sidebar visibility
        this.toggle.addEventListener('click', () => this.toggleSidebar());
        
        // Handle link clicks for smooth scrolling
        this.sidebar.addEventListener('click', (e) => {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                this.scrollToHeader(e.target.dataset.target);
            }
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', () => this.throttle(() => this.updateActiveLink(), 100));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !this.sidebar.contains(e.target) && 
                !this.toggle.contains(e.target) && 
                this.isVisible) {
                this.toggleSidebar();
            }
        });
        
        // Handle escape key to close sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.toggleSidebar();
            }
        });
    }
    
    toggleSidebar() {
        this.isVisible = !this.isVisible;
        this.sidebar.classList.toggle('hidden', !this.isVisible);
        this.toggle.innerHTML = this.isVisible ? '📋' : '📖';
        this.toggle.title = this.isVisible ? 'Hide Table of Contents' : 'Show Table of Contents';
    }
    
    scrollToHeader(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const offset = 100; // Account for fixed header
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Auto-hide sidebar on mobile after clicking
            if (window.innerWidth <= 768 && this.isVisible) {
                setTimeout(() => this.toggleSidebar(), 300);
            }
            
            // Update active link immediately
            setTimeout(() => this.updateActiveLink(), 100);
        }
    }
    
    updateActiveLink() {
        const scrollPosition = window.scrollY + 150; // Offset for better UX
        let activeHeader = null;
        
        // Find the current section
        for (let i = this.headers.length - 1; i >= 0; i--) {
            const header = this.headers[i];
            if (header.element.offsetTop <= scrollPosition) {
                activeHeader = header;
                break;
            }
        }
        
        // Update active link styling
        const links = this.sidebar.querySelectorAll('.toc-link');
        links.forEach(link => link.classList.remove('active'));
        
        if (activeHeader) {
            const activeLink = this.sidebar.querySelector(`[data-target="${activeHeader.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                this.activeLink = activeLink;
            }
        }
    }
    
    handleResize() {
        // Auto-hide sidebar on mobile when resizing to mobile view
        if (window.innerWidth <= 768 && this.isVisible) {
            this.toggleSidebar();
        }
    }
    
    // Throttle function to limit scroll event frequency
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize TOC when script loads
new TableOfContents();