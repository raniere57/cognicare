// CogniCare Pro Review - JavaScript Mínimo
// Foco em funcionalidades essenciais para SEO e UX

document.addEventListener('DOMContentLoaded', function() {
    
    // Modal functionality
    const modal = document.getElementById('welcomeModal');
    const modalClose = document.querySelector('.modal-close');
    const stayReviewBtn = document.querySelector('.modal-btn.read-review');
    const goOfficialBtn = document.querySelector('.modal-btn.official-page');
    
    console.log('Modal elements found:', {
        modal: !!modal,
        modalClose: !!modalClose,
        stayReviewBtn: !!stayReviewBtn,
        goOfficialBtn: !!goOfficialBtn
    });
    
    // Show modal when page loads (with small delay for better UX)
    setTimeout(() => {
        if (modal) {
            console.log('Showing modal...');
            modal.classList.add('show');
        } else {
            console.log('Modal not found!');
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
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
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
    
    // Close modal with Escape key
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
        });
    });

    // Lazy loading para imagens (fallback para browsers mais antigos)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Se a imagem já foi carregada
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

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
        });
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
        });
    });

    // Highlight da seção ativa no TOC (scroll spy simples)
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event para performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveSection, 10);
    });

    // Inicializar highlight ativo
    updateActiveSection();

    // Adicionar classe CSS para link ativo
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents a.active {
            background: #667eea;
            color: white;
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);

    // Melhorar acessibilidade - foco visível
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Adicionar estilos para navegação por teclado
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #667eea !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyle);

    // Performance: Preload de imagens críticas
    function preloadCriticalImages() {
        const criticalImages = [
            'images/CogniCare Pro.webp',
            'images/i-green-coffee.jpg',
            'images/i-tyrosine.jpg',
            'images/i-bacopa.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages();

    // Adicionar meta tags dinâmicas para SEO (se necessário)
    function updateMetaTags() {
        // Você pode adicionar meta tags dinâmicas aqui se necessário
        const currentTime = new Date().toISOString();
        
        // Exemplo: atualizar timestamp da página
        const metaUpdated = document.querySelector('meta[name="updated"]');
        if (!metaUpdated) {
            const meta = document.createElement('meta');
            meta.name = 'updated';
            meta.content = currentTime;
            document.head.appendChild(meta);
        }
    }

    updateMetaTags();

    // Console log for debug (remove in production)
    console.log('CogniCare Pro Review Page loaded successfully');
    console.log('Ready for affiliate link integration');
});

// Funções globais para o HTML
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// All affiliate links are now directly embedded in the HTML
