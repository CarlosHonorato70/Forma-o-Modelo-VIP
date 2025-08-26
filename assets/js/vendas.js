// JavaScript para Página de Vendas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initCountdown();
    initFormValidation();
    initSmoothScroll();
    initVagasCounter();
    
    console.log('Página de vendas carregada');
});

// Contador Regressivo
function initCountdown() {
    // Data final da oferta (7 dias a partir de agora)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Atualizar contadores principais
            updateElement('days', String(days).padStart(2, '0'));
            updateElement('hours', String(hours).padStart(2, '0'));
            updateElement('minutes', String(minutes).padStart(2, '0'));
            updateElement('seconds', String(seconds).padStart(2, '0'));
            
            // Atualizar contador do header
            updateElement('countdown-header', `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
            
            // Atualizar contador final
            updateElement('final-hours', String(hours).padStart(2, '0'));
            updateElement('final-minutes', String(minutes).padStart(2, '0'));
            updateElement('final-seconds', String(seconds).padStart(2, '0'));
        } else {
            // Oferta expirada
            updateElement('days', '00');
            updateElement('hours', '00');
            updateElement('minutes', '00');
            updateElement('seconds', '00');
            updateElement('countdown-header', 'OFERTA EXPIRADA');
        }
    }
    
    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Atualizar a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Contador de Vagas
function initVagasCounter() {
    const vagasElements = document.querySelectorAll('.vagas-restantes');
    let vagas = 7; // Número inicial de vagas
    
    // Simular redução de vagas (opcional)
    function reduzirVagas() {
        if (vagas > 1) {
            vagas--;
            vagasElements.forEach(element => {
                element.textContent = vagas;
                
                // Adicionar efeito visual
                element.style.transform = 'scale(1.2)';
                element.style.color = '#e53e3e';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            });
        }
    }
    
    // Reduzir vagas a cada 5 minutos (opcional)
    // setInterval(reduzirVagas, 5 * 60 * 1000);
}

// Validação do Formulário
function initFormValidation() {
    const form = document.getElementById('inscricaoForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos obrigatórios
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'Este campo é obrigatório');
            } else {
                clearFieldError(field);
            }
        });
        
        // Validar email
        const emailField = form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                showFieldError(emailField, 'Digite um email válido');
            }
        }
        
        // Validar telefone
        const telefoneField = form.querySelector('[name="telefone"]');
        if (telefoneField && telefoneField.value) {
            const telefoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!telefoneRegex.test(telefoneField.value)) {
                isValid = false;
                showFieldError(telefoneField, 'Digite um telefone válido');
            }
        }
        
        if (isValid) {
            // Mostrar loading
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            submitBtn.disabled = true;
            
            // Simular envio (remover em produção)
            setTimeout(() => {
                // Enviar formulário
                form.submit();
            }, 1000);
        }
    });
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e53e3e';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#e2e8f0';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Scroll Suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-vendas').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações de Entrada
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.beneficio-card, .depoimento-card, .plano-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Tracking de Eventos (opcional)
function trackEvent(eventName, properties = {}) {
    // Implementar tracking com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, properties);
    
    // Exemplo para Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Exemplo para Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Event Listeners para Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    trackEvent('PageView', {
        page: 'vendas',
        title: 'Página de Vendas - Terapia VIP'
    });
    
    // Track clicks nos botões CTA
    const ctaButtons = document.querySelectorAll('.btn-cta-principal, .btn-plano, .btn-inscricao');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('CTAClick', {
                button_text: buttonText,
                button_location: this.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestones
            if (maxScroll >= 25 && maxScroll < 50) {
                trackEvent('ScrollDepth', { depth: '25%' });
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackEvent('ScrollDepth', { depth: '50%' });
            } else if (maxScroll >= 75 && maxScroll < 90) {
                trackEvent('ScrollDepth', { depth: '75%' });
            } else if (maxScroll >= 90) {
                trackEvent('ScrollDepth', { depth: '90%' });
            }
        }
    });
    
    // Track form interactions
    const formFields = document.querySelectorAll('#inscricaoForm input, #inscricaoForm select, #inscricaoForm textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackEvent('FormFieldFocus', {
                field_name: this.name || this.id,
                field_type: this.type || this.tagName.toLowerCase()
            });
        });
    });
});

// Utilitários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatPhone(phone) {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Formatar telefone brasileiro
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
}

// Auto-formatação de campos
document.addEventListener('DOMContentLoaded', function() {
    const telefoneField = document.querySelector('[name="telefone"]');
    if (telefoneField) {
        telefoneField.addEventListener('input', function() {
            this.value = formatPhone(this.value);
        });
    }
});

// Inicializar animações quando a página carregar
window.addEventListener('load', function() {
    initScrollAnimations();
});

