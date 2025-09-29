document.addEventListener('DOMContentLoaded', () => {
    // Função para tornar elementos redimensionáveis
    function makeResizable(element) {
        const resizable = element.querySelector('.resizable');
        const handle = element.querySelector('.resizable-handle');
        const widthDisplay = element.querySelector('.width-value');
        const heightDisplay = element.querySelector('.height-value');
        const fontSizeDisplay = element.querySelector('.font-size-value');
        const squareWidthDisplay = element.querySelector('.square-width-value');
        const textElement = element.querySelector('.unidades-exemplo');
        const squareElement = element.querySelector('.quadrado-exemplo');
    
        
        if (!resizable || !handle) return;
        
        let isResizing = false;
        let lastX, lastY;
        
        function updateSize() {
            if (widthDisplay) {
                widthDisplay.textContent = Math.round(resizable.offsetWidth);
            }
            if (heightDisplay) {
                heightDisplay.textContent = Math.round(resizable.offsetHeight);
            }
             if (fontSizeDisplay && textElement) {
            const fontSize = window.getComputedStyle(textElement).fontSize;
            fontSizeDisplay.textContent = fontSize;
            }
            if (squareWidthDisplay && squareElement) {
                squareWidthDisplay.textContent = Math.round(squareElement.offsetWidth);
            }
        }

        const observer = new ResizeObserver(updateSize);
        observer.observe(resizable);
        if (textElement) observer.observe(textElement);
        if (squareElement) observer.observe(squareElement);
    
    // Inicializa o tamanho
    
        // Inicializa o tamanho
        updateSize();
        
        // Eventos para desktop
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            lastX = e.clientX;
            lastY = e.clientY;
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });
        
        // Eventos para touch
        handle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isResizing = true;
            const touch = e.touches[0];
            lastX = touch.clientX;
            lastY = touch.clientY;
            document.addEventListener('touchmove', resizeTouch);
            document.addEventListener('touchend', stopResize);
        });
        
        function resize(e) {
            if (!isResizing) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            
            const newWidth = resizable.offsetWidth + dx;
            const newHeight = resizable.offsetHeight + dy;
            
            resizable.style.width = `${newWidth}px`;
            resizable.style.height = `${newHeight}px`;
            
            lastX = e.clientX;
            lastY = e.clientY;
            
            updateSize();
        }
        
        function resizeTouch(e) {
            if (!isResizing) return;
            const touch = e.touches[0];
            const dx = touch.clientX - lastX;
            const dy = touch.clientY - lastY;
            
            const newWidth = resizable.offsetWidth + dx;
            const newHeight = resizable.offsetHeight + dy;
            
            resizable.style.width = `${newWidth}px`;
            resizable.style.height = `${newHeight}px`;
            
            lastX = touch.clientX;
            lastY = touch.clientY;
            
            updateSize();
        }
        
        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('touchmove', resizeTouch);
            document.removeEventListener('touchend', stopResize);
        }
    }
    
    // Aplica redimensionamento aos exemplos quando são exibidos
    document.querySelectorAll('.btn-exemplo').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const isVisible = targetElement.style.display === 'block';
                targetElement.style.display = isVisible ? 'none' : 'block';
                button.textContent = isVisible ? 'Ver Exemplo' : 'Ocultar Exemplo';
                
                // Inicializa o redimensionamento quando o exemplo é exibido
                if (!isVisible) {
                    setTimeout(() => makeResizable(targetElement), 10);
                }
            }
        });
    });
    
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
function makeResizable(element) {
    const resizable = element.querySelector('.resizable');
    const handle = element.querySelector('.resizable-handle');
    const widthDisplay = element.querySelector('.width-value');
    const heightDisplay = element.querySelector('.height-value');
    const fontSizeDisplay = element.querySelector('.font-size-value');
    const squareWidthDisplay = element.querySelector('.square-width-value');
    const textElement = element.querySelector('.unidades-exemplo');
    const squareElement = element.querySelector('.quadrado-exemplo');
    
    if (!resizable || !handle) return;
    
    let isResizing = false;
    let lastX, lastY;
    
    function updateSize() {
        if (widthDisplay) {
            widthDisplay.textContent = Math.round(resizable.offsetWidth);
        }
        if (heightDisplay) {
            heightDisplay.textContent = Math.round(resizable.offsetHeight);
        }
        // Dynamically set font size based on container width
        if (textElement) {
            // Set font size to 5% of container width, minimum 12px, maximum 48px
            const containerWidth = resizable.offsetWidth;
            const fontSizePx = Math.max(12, Math.min(48, containerWidth * 0.05));
            textElement.style.fontSize = fontSizePx + 'px';
            if (fontSizeDisplay) {
                fontSizeDisplay.textContent = Math.round(fontSizePx) + 'px';
            }
        }
        if (squareWidthDisplay && squareElement) {
            squareWidthDisplay.textContent = Math.round(squareElement.offsetWidth);
        }
    }
    
    const observer = new ResizeObserver(updateSize);
    observer.observe(resizable);
    if (textElement) observer.observe(textElement);
    if (squareElement) observer.observe(squareElement);
    
    updateSize();
    
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isResizing = true;
        lastX = e.clientX;
        lastY = e.clientY;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });
    
    function resize(e) {
        if (!isResizing) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        
        const newWidth = resizable.offsetWidth + dx;
        const newHeight = resizable.offsetHeight + dy;
        
        resizable.style.width = `${newWidth}px`;
        resizable.style.height = `${newHeight}px`;
        
        lastX = e.clientX;
        lastY = e.clientY;
    }
    
    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
    
    // Touch support
    handle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isResizing = true;
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
        document.addEventListener('touchmove', resizeTouch);
        document.addEventListener('touchend', stopResizeTouch);
    });
    
    function resizeTouch(e) {
        if (!isResizing) return;
        const touch = e.touches[0];
        const dx = touch.clientX - lastX;
        const dy = touch.clientY - lastY;
        
        const newWidth = resizable.offsetWidth + dx;
        const newHeight = resizable.offsetHeight + dy;
        
        resizable.style.width = `${newWidth}px`;
        resizable.style.height = `${newHeight}px`;
        
        lastX = touch.clientX;
        lastY = touch.clientY;
    }
    
    function stopResizeTouch() {
        isResizing = false;
        document.removeEventListener('touchmove', resizeTouch);
        document.removeEventListener('touchend', stopResizeTouch);
    }
}
    
});

