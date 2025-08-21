document.addEventListener('DOMContentLoaded', () => {
    // Funções de conversão de cor
    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    // Elementos do DOM
    const hueSlider = document.getElementById('hueSlider');
    const hueHandle = document.getElementById('hueHandle');
    const lightnessSlider = document.getElementById('lightnessSlider');
    const lightnessHandle = document.getElementById('lightnessHandle');
    const colorDisplay = document.getElementById('color-display');
    const hexCode = document.getElementById('hex-code');
    const rgbCode = document.getElementById('rgb-code');
    const hslCode = document.getElementById('hsl-code');

    // Variáveis de estado
    let currentHue = 0;
    let currentLightness = 50;
    const currentSaturation = 100; // Fixamos a saturação em 100% para simplificar
    let isDraggingHue = false;
    let isDraggingLightness = false;

    // Atualiza a cor exibida
    function updateColor() {
        const hsl = `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`;
        const rgb = hslToRgb(currentHue, currentSaturation, currentLightness);
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const hex = rgbToHex(r, g, b);

        colorDisplay.style.backgroundColor = hsl;
        hexCode.textContent = hex;
        rgbCode.textContent = rgb;
        hslCode.textContent = hsl;

        // Atualiza as cores dinamicamente na página
        document.documentElement.style.setProperty('--cor-primaria', hsl);
        // arrumar o bug de colorir a página toda se quiser haha

        // Atualiza o gradiente do slider de luminosidade
        lightnessSlider.style.background = `linear-gradient(to right, 
            hsl(${currentHue}, ${currentSaturation}%, 0%), 
            hsl(${currentHue}, ${currentSaturation}%, 50%), 
            hsl(${currentHue}, ${currentSaturation}%, 100%))`;
    }

    // Configura os sliders
    function setupSlider(slider, handle, isHueSlider) {
        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            updateSlider(e, isHueSlider);
            if (isHueSlider) isDraggingHue = true;
            else isDraggingLightness = true;
        };

        const drag = (e) => {
            if (isDragging) {
                updateSlider(e, isHueSlider);
            }
        };

        const stopDrag = () => {
            isDragging = false;
            if (isHueSlider) isDraggingHue = false;
            else isDraggingLightness = false;
        };

        // deve ta aqui
        const updateSlider = (e, isHue) => {
            const rect = slider.getBoundingClientRect();
            let pos = (e.clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));

            const value = Math.round(pos * (isHue ? 360 : 100));
            handle.style.left = `${pos * 100}%`;

            if (isHue) {
                currentHue = value;
            } else {
                currentLightness = 100 - value; // invertemos para ir do escuro ao claro !!!!!!!!!!!
            }

            updateColor();
        };

        // Eventos de mouse
        slider.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        // Eventos de touch
        slider.addEventListener('touchstart', (e) => {
            startDrag(e.touches[0]);
        });

        document.addEventListener('touchmove', (e) => {
            drag(e.touches[0]);
        });

        document.addEventListener('touchend', stopDrag);
    }

    // Inicializa os sliders
    setupSlider(hueSlider, hueHandle, true);
    setupSlider(lightnessSlider, lightnessHandle, false);

    // Define a posição inicial dos handles
    hueHandle.style.left = '0%';
    lightnessHandle.style.left = '50%';

    // Atualiza a cor inicial
    updateColor();

    // Restante do seu código (botões de exemplo, busca, etc.)
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

    const searchInput = document.getElementById('searchInput');
    const noResultsDiv = document.getElementById('noResults');
    const searchTermSpan = document.getElementById('searchTerm');
    const tagCards = document.querySelectorAll('.tag-card');

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