 // Evento de clique
        document.getElementById('botao-clique').addEventListener('click', function() {
            alert('Você clicou no botão!');
        });
        
        // Evento de duplo clique
        document.getElementById('botao-duplo-clique').addEventListener('dblclick', function() {
            document.getElementById('area-interacao').textContent = 'Duplo clique detectado!';
        });
        
        // Eventos de mouse
        const area = document.getElementById('area-interacao');
        area.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'lightyellow';
            this.textContent = 'Mouse sobre a área';
        });
        
        area.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.textContent = 'Passe o mouse aqui';
        });
        
        // Evento de teclado
        document.getElementById('campo-texto').addEventListener('keyup', function(e) {
            document.getElementById('texto-digitado').textContent = 
                `Você digitou: ${this.value} (Última tecla: ${e.key})`;
        });