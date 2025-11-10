const resultado = document.getElementById('resultado');
        
        // Função simples
        function saudacao() {
            const nome = prompt('Qual seu nome?') || 'Visitante';
            resultado.innerHTML = `<p>Olá, ${nome}! Bem-vindo ao estudo de funções.</p>`;
        }
        
        // Função com retorno
        function calcular() {
            const num1 = parseFloat(prompt('Digite o primeiro número:')) || 0;
            const num2 = parseFloat(prompt('Digite o segundo número:')) || 0;
            
            const soma = num1 + num2;
            const subtracao = num1 - num2;
            const multiplicacao = num1 * num2;
            const divisao = num2 !== 0 ? num1 / num2 : '∞';
            
            resultado.innerHTML = `
                <h3>Resultados:</h3>
                <p>${num1} + ${num2} = ${soma}</p>
                <p>${num1} - ${num2} = ${subtracao}</p>
                <p>${num1} × ${num2} = ${multiplicacao}</p>
                <p>${num1} ÷ ${num2} = ${divisao}</p>
            `;
        }
        
        // Função anônima
        const funcaoAnonima = function() {
            return new Date().toLocaleTimeString();
        };
        
        function usarFuncaoAnonima() {
            resultado.innerHTML = `<p>Função anônima executada às: ${funcaoAnonima()}</p>`;
        }
        
        // Arrow function
        const quadrado = x => x * x;
        
        function usarArrowFunction() {
            const numero = parseFloat(prompt('Digite um número para elevar ao quadrado:')) || 0;
            resultado.innerHTML = `<p>${numero}² = ${quadrado(numero)}</p>`;
        }