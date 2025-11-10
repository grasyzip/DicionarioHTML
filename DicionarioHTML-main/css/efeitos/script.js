document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.btn-exemplo');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const isVisible = targetElement.style.display === 'block';
                targetElement.style.display = isVisible ? 'none' : 'block';
                button.textContent = isVisible ? 'Ver Exemplo' : 'Ocultar Exemplo';
            }
        });
    });

    // Lógica para as demonstrações de animação
    const demoBox = document.querySelector('.demo-box');
    const transitionButton = document.getElementById('transition-btn');
    const rotateButton = document.getElementById('rotate-btn');
    const pulseButton = document.getElementById('pulse-btn');

    if (transitionButton) {
        transitionButton.addEventListener('click', () => {
            demoBox.classList.toggle('transition-demo');
        });
    }

    if (rotateButton) {
        rotateButton.addEventListener('click', () => {
            demoBox.classList.toggle('rotate-animation');
        });
    }

    if (pulseButton) {
        pulseButton.addEventListener('click', () => {
            demoBox.classList.toggle('pulse-animation');
        });
    }
});