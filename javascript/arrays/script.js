 // Função para mostrar/ocultar exemplos
        document.querySelectorAll('.btn-exemplo').forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                // Fechar todos os exemplos abertos
                document.querySelectorAll('.exemplo-interativo').forEach(example => {
                    if (example.id !== targetId) {
                        example.style.display = 'none';
                    }
                });
                
                // Alternar o exemplo atual
                if (targetElement.style.display === 'none' || targetElement.style.display === '') {
                    targetElement.style.display = 'block';
                } else {
                    targetElement.style.display = 'none';
                }
            });
        });
        
        // Função para executar os exemplos
        function executarExemplo(exampleId) {
            const resultadoElement = document.getElementById(`resultado-${exampleId.split('-')[1]}`);
            resultadoElement.innerHTML = ''; // Limpar resultado anterior
            
            // Capturar o código do exemplo
            const codeElement = document.querySelector(`#${exampleId} pre code`);
            const code = codeElement.textContent;
            
            // Redirecionar console.log para o elemento de resultado
            const originalLog = console.log;
            console.log = function(...args) {
                resultadoElement.innerHTML += args.map(arg => {
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg);
                        } catch (e) {
                            return String(arg);
                        }
                    }
                    return String(arg);
                }).join(' ') + '\n';
                originalLog.apply(console, args);
            };
            
            // Executar o código
            try {
                eval(code);
            } catch (error) {
                resultadoElement.innerHTML = 'Erro: ' + error.message;
            }
            
            // Restaurar console.log original
            console.log = originalLog;
        }
        
        // Definir ano atual no footer
        document.getElementById('current-year').textContent = new Date().getFullYear();