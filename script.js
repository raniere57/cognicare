// Optimized JavaScript for CogniCare Pro Review Site
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('welcomeModal');
    const modalClose = document.querySelector('.modal-close');
    const stayReviewBtn = document.querySelector('.read-review');
    const goOfficialBtn = document.querySelector('.official-page');
    
    // Show modal when page loads (with small delay for better UX)
    setTimeout(() => {
        if (modal) {
            modal.classList.add('show');
        }
    }, 500);
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            // Remove modal from DOM after animation
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }
    
    // Close modal when clicking X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside (overlay)
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) { // Check if click is directly on the modal overlay
                closeModal();
            }
        });
    }
    
    // Stay on review page (close modal)
    if (stayReviewBtn) {
        stayReviewBtn.addEventListener('click', closeModal);
    }
    
    // Go to official page
    if (goOfficialBtn) {
        goOfficialBtn.addEventListener('click', function(e) {
            console.log('Official page button clicked');
            
            // Track conversion without preventing default behavior
            if (typeof gtag_report_conversion === 'function') {
                try {
                    gtag_report_conversion(this.href);
                } catch (error) {
                    console.log('Error with gtag_report_conversion:', error);
                }
            }
            
            // Close modal when clicking the official page link
            closeModal();
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, { passive: false });
    });

    // Optimized lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    // Tracking de cliques nos botões CTA (para analytics)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('CTA clicked:', this.textContent);
            
            // Track conversion without preventing default behavior
            if (typeof gtag_report_conversion === 'function') {
                try {
                    gtag_report_conversion(this.href);
                } catch (error) {
                    console.log('Error with gtag_report_conversion:', error);
                }
            }
            
            // Let the link work normally
        }, { passive: true });
    });

    // Make CogniCare text spans clickable
    const cognicareTexts = document.querySelectorAll('.cognicare-text');
    cognicareTexts.forEach(text => {
        text.addEventListener('click', function() {
            console.log('CogniCare text clicked');
            
            // Track conversion
            if (typeof gtag_report_conversion === 'function') {
                try {
                    gtag_report_conversion('https://1caa6dp7s7w17v87r6yhp-67c5.hop.clickbank.net');
                } catch (error) {
                    console.log('Error with gtag_report_conversion:', error);
                }
            }
            
            // Open affiliate link
            window.open('https://1caa6dp7s7w17v87r6yhp-67c5.hop.clickbank.net', '_blank');
        }, { passive: true });
    });

    // Optimized scroll spy for TOC
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    if (sections.length && tocLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    tocLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding link
                    const activeLink = document.querySelector(`.table-of-contents a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, { 
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0.1
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
});

// Global functions for HTML onclick attributes (for direct calls from HTML)
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Function to handle conversion tracking and redirection
function trackAndRedirect(url) {
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(url);
    } else {
        console.warn('gtag_report_conversion is not defined. Opening URL directly.');
        window.open(url, '_blank');
    }
}