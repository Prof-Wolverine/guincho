/**
 * Guincho Rápido - Script Principal
 * Desenvolvido para uma empresa de serviços de guincho
 */

// Espera o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initSlider();
    initDepoimentos();
    initFAQ();
    initScrollToTop();
    initStickyHeader();
    initCalculadora();
    initFormValidation();
    initSmoothScroll();
});

/**
 * Menu Mobile
 * Controla a abertura e fechamento do menu em dispositivos móveis
 */
function initMobileMenu() {
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    
    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
    }
    
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
    
    // Fecha o menu ao clicar em um link
    const menuLinks = document.querySelectorAll('#menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            btnMobile.setAttribute('aria-expanded', false);
            btnMobile.setAttribute('aria-label', 'Abrir Menu');
        });
    });
}

/**
 * Slider Principal
 * Controla o carrossel de imagens na seção banner
 */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        // Remove a classe active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona a classe active ao slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Atualiza o índice do slide atual
        currentSlide = index;
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }
    
    // Função para voltar para o slide anterior
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }
    
    // Inicia o intervalo de troca automática de slides
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Para o intervalo de troca automática de slides
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // Adiciona eventos aos botões de navegação
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideInterval();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    // Adiciona eventos aos dots de navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideInterval();
            startSlideInterval();
        });
    });
    
    // Inicia o slider
    startSlideInterval();
}

/**
 * Slider de Depoimentos
 * Controla o carrossel de depoimentos
 */
function initDepoimentos() {
    const slides = document.querySelectorAll('.depoimento-slide');
    const dots = document.querySelectorAll('.depoimento-dots .dot');
    const prevBtn = document.querySelector('.depoimento-btn.prev');
    const nextBtn = document.querySelector('.depoimento-btn.next');
    let currentSlide = 0;
    
    // Função para mostrar um depoimento específico
    function showSlide(index) {
        // Remove a classe active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona a classe active ao slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Atualiza o índice do slide atual
        currentSlide = index;
    }
    
    // Função para avançar para o próximo depoimento
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }
    
    // Função para voltar para o depoimento anterior
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }
    
    // Adiciona eventos aos botões de navegação
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Adiciona eventos aos dots de navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

/**
 * FAQ Accordion
 * Controla a abertura e fechamento das perguntas frequentes
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
        });
    });
}

/**
 * Botão Voltar ao Topo
 * Controla a exibição e funcionalidade do botão de voltar ao topo
 */
function initScrollToTop() {
    const btnTopo = document.getElementById('btn-topo');
    
    // Exibe o botão quando o usuário rolar a página
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnTopo.classList.add('visible');
        } else {
            btnTopo.classList.remove('visible');
        }
    });
    
    // Rola suavemente para o topo ao clicar no botão
    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Header Fixo
 * Adiciona uma classe ao header quando o usuário rolar a página
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Calculadora de Preço
 * Controla a abertura, fechamento e cálculo da calculadora de preço
 */
function initCalculadora() {
    const btnCalculadora = document.getElementById('btn-calculadora');
    const calculadoraModal = document.getElementById('calculadora-modal');
    const closeModal = document.querySelector('.close-modal');
    const fecharModal = document.querySelector('.fechar-modal');
    const formCalculadora = document.getElementById('form-calculadora');
    const resultadoCalculo = document.getElementById('resultado-calculo');
    const valorEstimado = document.getElementById('valor-estimado');
    
    // Abre o modal da calculadora
    btnCalculadora.addEventListener('click', () => {
        calculadoraModal.classList.add('active');
    });
    
    // Fecha o modal da calculadora
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            calculadoraModal.classList.remove('active');
        });
    }
    
    if (fecharModal) {
        fecharModal.addEventListener('click', () => {
            calculadoraModal.classList.remove('active');
        });
    }
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === calculadoraModal) {
            calculadoraModal.classList.remove('active');
        }
    });
    
    // Calcula o preço estimado
    if (formCalculadora) {
        formCalculadora.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const tipoVeiculo = document.getElementById('tipo-veiculo').value;
            const distancia = parseFloat(document.getElementById('distancia').value);
            
            // Valores base por tipo de veículo (por km)
            const valores = {
                'carro': 3.5,
                'moto': 3.0,
                'van': 4.5,
                'caminhonete': 4.0
            };
            
            // Taxa fixa de saída
            const taxaSaida = 50;
            
            // Cálculo do valor estimado
            let valor = 0;
            
            if (tipoVeiculo && !isNaN(distancia)) {
                valor = taxaSaida + (distancia * valores[tipoVeiculo]);
                
                // Adiciona taxa adicional para distâncias maiores
                if (distancia > 50) {
                    valor += 50; // Taxa adicional para longas distâncias
                }
                
                // Formata o valor para exibição
                valorEstimado.textContent = valor.toFixed(2).replace('.', ',');
                
                // Exibe o resultado
                resultadoCalculo.classList.remove('hidden');
                formCalculadora.classList.add('hidden');
            }
        });
    }
}

/**
 * Validação de Formulário
 * Valida os campos do formulário de contato antes do envio
 */
function initFormValidation() {
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Obtém os valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Valida os campos
            let isValid = true;
            
            if (nome === '') {
                showError('nome', 'Por favor, informe seu nome completo.');
                isValid = false;
            } else {
                clearError('nome');
            }
            
            if (email === '') {
                showError('email', 'Por favor, informe seu e-mail.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Por favor, informe um e-mail válido.');
                isValid = false;
            } else {
                clearError('email');
            }
            
            if (telefone === '') {
                showError('telefone', 'Por favor, informe seu telefone.');
                isValid = false;
            } else {
                clearError('telefone');
            }
            
            if (assunto === '') {
                showError('assunto', 'Por favor, selecione um assunto.');
                isValid = false;
            } else {
                clearError('assunto');
            }
            
            if (mensagem === '') {
                showError('mensagem', 'Por favor, escreva sua mensagem.');
                isValid = false;
            } else {
                clearError('mensagem');
            }
            
            // Se todos os campos forem válidos, simula o envio do formulário
            if (isValid) {
                // Aqui seria feita a integração com um backend real
                // Por enquanto, apenas simula o envio
                
                // Exibe mensagem de sucesso
                const formGroup = formContato.querySelector('.form-group:last-child');
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Remove mensagem anterior se existir
                const oldMessage = formContato.querySelector('.success-message');
                if (oldMessage) {
                    oldMessage.remove();
                }
                
                // Adiciona a nova mensagem
                formGroup.insertAdjacentElement('afterend', successMessage);
                
                // Limpa o formulário
                formContato.reset();
                
                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Função para exibir mensagem de erro
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove mensagem de erro anterior se existir
        const oldError = formGroup.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        
        // Adiciona a classe de erro ao campo
        field.classList.add('error');
        
        // Cria e adiciona a mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
    }
    
    // Função para limpar mensagem de erro
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove a classe de erro do campo
        field.classList.remove('error');
        
        // Remove a mensagem de erro se existir
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Função para validar e-mail
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

/**
 * Rolagem Suave
 * Adiciona rolagem suave para links internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            // Ignora se o href for apenas "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Calcula a posição do elemento alvo
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Rola até o elemento
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

