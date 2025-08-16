document.addEventListener('DOMContentLoaded', () => {
    // Funções de conversão de cor (mantidas do script anterior)
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // acromático
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    // Elementos do DOM
    const colorWheelCanvas = document.getElementById('color-wheel-canvas');
    const colorPickerDot = document.getElementById('color-picker');
    const colorDisplay = document.getElementById('color-display');
    const hexCode = document.getElementById('hex-code');
    const rgbCode = document.getElementById('rgb-code');
    const hslCode = document.getElementById('hsl-code');

    const introSection = document.querySelector('.intro');
    const tagCards = document.querySelectorAll('.tag-card');

    if (colorWheelCanvas) {
        const ctx = colorWheelCanvas.getContext('2d');
        const size = 250;
        colorWheelCanvas.width = size;
        colorWheelCanvas.height = size;
        const radius = size / 2;

        // Desenha a roda de cores
        function drawColorWheel() {
            const gradient = ctx.createConicGradient(0, radius, radius);
            gradient.addColorStop(0, '#f00');
            gradient.addColorStop(0.166, '#ff0');
            gradient.addColorStop(0.333, '#0f0');
            gradient.addColorStop(0.5, '#0ff');
            gradient.addColorStop(0.666, '#00f');
            gradient.addColorStop(0.833, '#f0f');
            gradient.addColorStop(1, '#f00');
            
            ctx.beginPath();
            ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
        }

        drawColorWheel();

        // Atualiza a interface com a nova cor
        function updateColor(color) {
            const hex = color;
            const rgb = hexToRgb(hex);
            const [r, g, b] = rgb.match(/\d+/g).map(Number);
            const hsl = rgbToHsl(r, g, b);

            hexCode.textContent = hex;
            rgbCode.textContent = rgb;
            hslCode.textContent = hsl;
            colorDisplay.style.backgroundColor = hex;

            // Atualiza as cores dinamicamente na página
            document.documentElement.style.setProperty('--cor-primaria', hex);
        }

        // Obtém a cor do pixel clicado
        function getColorFromClick(event) {
            const rect = colorWheelCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const imageData = ctx.getImageData(x, y, 1, 1).data;
            const r = imageData[0];
            const g = imageData[1];
            const b = imageData[2];

            const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            
            updateColor(hex);
            colorPickerDot.style.left = `${x}px`;
            colorPickerDot.style.top = `${y}px`;
        }

        let isDragging = false;

        colorWheelCanvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            getColorFromClick(e);
        });

        colorWheelCanvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                getColorFromClick(e);
            }
        });

        colorWheelCanvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Define a cor inicial
        updateColor('#007bff');
    }
    
    // Lógica para os botões de exemplo (mantida do script anterior)
    document.querySelectorAll('.btn-exemplo').forEach(button => {
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

    // Função de busca (mantida do script anterior)
    const searchInput = document.getElementById('searchInput');
    const noResultsDiv = document.getElementById('noResults');
    const searchTermSpan = document.getElementById('searchTerm');
    const tagListSection = document.querySelector('.tag-list');

    function searchProperties() {
        const query = searchInput.value.toLowerCase();
        let foundResults = false;

        tagCards.forEach(card => {
            const tagName = card.querySelector('.tag-name').textContent.toLowerCase();
            const tagDesc = card.querySelector('.tag-desc').textContent.toLowerCase();
            if (tagName.includes(query) || tagDesc.includes(query)) {
                card.style.display = 'flex';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (query === '' || foundResults) {
            noResultsDiv.style.display = 'none';
        } else {
            noResultsDiv.style.display = 'block';
            searchTermSpan.textContent = query;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', searchProperties);
    }
});