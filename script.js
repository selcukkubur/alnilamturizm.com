// Language switching functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'tr';
        this.langButtons = document.querySelectorAll('.lang-btn');
        this.translatedElements = document.querySelectorAll('[data-tr]');
        
        this.init();
    }

    init() {
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        
        // Update button states
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update text content
        this.translatedElements.forEach(element => {
            const text = element.dataset[lang];
            if (text) {
                element.textContent = text;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
}

// Mobile navigation toggle
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Hero slider functionality
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isReady = false;
        
        // Start immediately, don't wait for images
        this.init();
    }

    init() {
        // Preload first image only, start slider immediately
        const firstImage = this.slides[0]?.querySelector('img');
        if (firstImage) {
            if (firstImage.complete) {
                this.startSlider();
            } else {
                firstImage.addEventListener('load', () => {
                    this.startSlider();
                }, { once: true });
            }
        } else {
            this.startSlider();
        }
    }

    startSlider() {
        this.isReady = true;
        // Start with first slide active
        this.slides[0]?.classList.add('active');
        
        // Start auto-sliding after 3 seconds
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        if (!this.isReady) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    destroy() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageDiv = document.getElementById('formMessage');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.originalBtnText = this.submitBtn?.textContent;
        
        // EmailJS configuration
        this.emailJSConfig = {
            serviceID: 'service_alnilam', // You'll need to create this in EmailJS
            templateID: 'template_contact', // You'll need to create this in EmailJS
            publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // You'll need to get this from EmailJS
        };
        
        this.initEmailJS();
        this.init();
    }

    initEmailJS() {
        // Initialize EmailJS with public key
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.emailJSConfig.publicKey);
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });

            // Real-time validation
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Send email via EmailJS
            await this.sendEmailJS(data);
            
            // Success message
            this.showMessage('✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            this.form.reset();
            this.clearAllFieldStyles();
            
            console.log('Email sent successfully:', data);
            
        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Fallback to mailto if EmailJS fails
            this.showMessage('📧 Email gönderiminde sorun oldu. Alternatif olarak direkt email linkini açıyoruz...', 'error');
            this.openMailtoLink(data);
            
        } finally {
            this.setLoadingState(false);
        }
    }

    async sendEmailJS(data) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        // Template parameters for EmailJS
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            message: data.message,
            to_email: 'info@alnilamturizm.com',
            subject: 'Alnilam Turizm - Yeni İletişim Formu Mesajı',
            reply_to: data.email
        };

        try {
            const response = await emailjs.send(
                this.emailJSConfig.serviceID,
                this.emailJSConfig.templateID,
                templateParams
            );
            
            if (response.status === 200) {
                return response;
            } else {
                throw new Error('EmailJS response error');
            }
        } catch (error) {
            // If EmailJS is not configured, use fallback
            if (error.message.includes('not found') || error.message.includes('YOUR_EMAILJS')) {
                throw new Error('EmailJS not configured - using fallback');
            }
            throw error;
        }
    }

    openMailtoLink(data) {
        // Create mailto link as fallback
        const subject = encodeURIComponent('Alnilam Turizm - İletişim Formu');
        const body = encodeURIComponent(`
Gönderen: ${data.name}
Email: ${data.email}
Telefon: ${data.phone}

Mesaj:
${data.message}

---
Bu mesaj alnilamturizm.com iletişim formundan gönderilmiştir.
        `);
        
        const mailtoLink = `mailto:info@alnilamturizm.com?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show instructions
        setTimeout(() => {
            this.showMessage('📬 Email istemciniz açıldı. Eğer açılmadıysa, lütfen direkt info@alnilamturizm.com adresine email gönderin.', 'success');
        }, 2000);
    }

    async simulateSubmission(data) {
        // Keep as backup - simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve(data);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 1500);
        });
    }

    validateForm(data) {
        const requiredFields = ['name', 'email', 'phone', 'message'];
        let isValid = true;

        // Check required fields
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showMessage('⚠️ Lütfen tüm alanları doldurun.', 'error');
                this.highlightEmptyFields();
                return false;
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('⚠️ Lütfen geçerli bir email adresi girin.', 'error');
            this.highlightField('email', false);
            return false;
        }

        // Enhanced phone validation (Turkish phone number format)
        const phoneRegex = /^(\+90|0)?[1-9]\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        const cleanPhone = data.phone.replace(/[\s-]/g, '');
        if (!phoneRegex.test(data.phone) || cleanPhone.length < 10) {
            this.showMessage('⚠️ Lütfen geçerli bir telefon numarası girin. (Örnek: 0532 123 45 67)', 'error');
            this.highlightField('phone', false);
            return false;
        }

        // Message length validation
        if (data.message.length < 10) {
            this.showMessage('⚠️ Lütfen en az 10 karakter uzunluğunda mesaj yazın.', 'error');
            this.highlightField('message', false);
            return false;
        }

        return true;
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.highlightField(field.name, false);
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.highlightField(field.name, false);
                return false;
            }
        }

        if (field.type === 'tel' && value) {
            const phoneRegex = /^(\+90|0)?[1-9]\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
            if (!phoneRegex.test(value)) {
                this.highlightField(field.name, false);
                return false;
            }
        }

        this.highlightField(field.name, true);
        return true;
    }

    highlightField(fieldName, isValid) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.style.borderColor = isValid ? '#10b981' : '#ef4444';
            field.style.boxShadow = isValid ? 
                '0 0 0 3px rgba(16, 185, 129, 0.1)' : 
                '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '#e5e7eb';
        field.style.boxShadow = 'none';
    }

    highlightEmptyFields() {
        const requiredFields = ['name', 'email', 'phone', 'message'];
        requiredFields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field && !field.value.trim()) {
                this.highlightField(fieldName, false);
            }
        });
    }

    clearAllFieldStyles() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }

    setLoadingState(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            this.submitBtn.style.opacity = '0.7';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = this.originalBtnText;
            this.submitBtn.style.opacity = '1';
        }
    }

    showMessage(message, type) {
        this.messageDiv.innerHTML = message;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';

        // Auto hide after 8 seconds for success, 10 seconds for error
        const hideDelay = type === 'success' ? 8000 : 10000;
        setTimeout(() => {
            this.messageDiv.style.display = 'none';
        }, hideDelay);

        // Scroll to message if not visible
        this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Lightbox functionality for gallery images
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.closeBtn = this.lightbox.querySelector('.close');
        this.galleryImages = document.querySelectorAll('.gallery-image');
        
        this.init();
    }

    init() {
        // Add click listeners to gallery images
        this.galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                this.openLightbox(e.target);
            });
        });

        // Close lightbox events
        this.closeBtn.addEventListener('click', () => {
            this.closeLightbox();
        });

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'block') {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                }
            }
        });
    }

    openLightbox(img) {
        this.lightboxImg.src = img.src;
        this.lightboxCaption.textContent = img.alt;
        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.destination-card, .service-card, .blog-card, .about-text, .about-image');
        this.init();
    }

    init() {
        // Add fade-in class to elements
        this.animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });

        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                this.header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// Intersection Observer for counter animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat h3');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.textContent.includes('+') ? '+' : '';
            counter.textContent = Math.floor(current).toLocaleString('tr-TR') + suffix;
        }, 16);
    }
}

// CTA Button click handler
class CTAHandler {
    constructor() {
        this.ctaButton = document.querySelector('.cta-button');
        this.init();
    }

    init() {
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', () => {
                const destinationsSection = document.getElementById('destinations');
                if (destinationsSection) {
                    const offsetTop = destinationsSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// Back to top button
class BackToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.className = 'back-to-top';
        this.button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(this.button);
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-5px)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'translateY(0)';
        });
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            // Add loaded class to body for any CSS animations
            document.body.classList.add('loaded');
            
            // Animate hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 1s ease';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 500);
            }
        });
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.hero) {
                this.hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new LanguageSwitcher();
    new MobileNav();
    new HeroSlider();
    new SmoothScroll();
    new ContactForm();
    new Lightbox();
    new ScrollAnimations();
    new HeaderScroll();
    new CounterAnimation();
    new CTAHandler();
    new BackToTop();
    new LoadingAnimation();
    
    // Optional: Enable parallax effect (comment out if performance issues on mobile)
    if (window.innerWidth > 768) {
        new ParallaxEffect();
    }

    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}); 
