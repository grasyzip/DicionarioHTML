
        // Funções para os exemplos
        function exemploVariaveis() {
            let output = document.getElementById('variaveis-output');
            output.innerHTML = '';
            
            // Usando let
            let nome = "João";
            output.innerHTML += `let nome = "${nome}"<br>`;
            nome = "Maria";
            output.innerHTML += `nome = "${nome}" (reatribuição permitida)<br><br>`;
            
            // Usando const
            const pi = 3.14159;
            output.innerHTML += `const pi = ${pi}<br>`;
            output.innerHTML += `// pi = 3.14 causaria um erro<br><br>`;
            
            // Usando var
            var idade = 30;
            output.innerHTML += `var idade = ${idade}`;
        }
        
        function exemploFuncoes() {
            let output = document.getElementById('funcoes-output');
            output.innerHTML = '';
            
            // Declaração de função
            function soma(a, b) {
                return a + b;
            }
            
            // Expressão de função
            const multiplicacao = function(a, b) {
                return a * b;
            };
            
            // Arrow function
            const divisao = (a, b) => a / b;
            
            output.innerHTML += `soma(5, 3) = ${soma(5, 3)}<br>`;
            output.innerHTML += `multiplicacao(5, 3) = ${multiplicacao(5, 3)}<br>`;
            output.innerHTML += `divisao(10, 2) = ${divisao(10, 2)}`;
        }
        
        function exemploArrays() {
            let output = document.getElementById('arrays-output');
            output.innerHTML = '';
            
            const numeros = [1, 2, 3, 4, 5];
            output.innerHTML += `Array original: [${numeros.join(', ')}]<br><br>`;
            
            // map
            const dobros = numeros.map(n => n * 2);
            output.innerHTML += `Dobros (map): [${dobros.join(', ')}]<br>`;
            
            // filter
            const pares = numeros.filter(n => n % 2 === 0);
            output.innerHTML += `Pares (filter): [${pares.join(', ')}]<br>`;
            
            // reduce
            const soma = numeros.reduce((acc, n) => acc + n, 0);
            output.innerHTML += `Soma (reduce): ${soma}`;
        }
        
        function exemploObjetos() {
            let output = document.getElementById('objetos-output');
            output.innerHTML = '';
            
            // Criando um objeto
            const pessoa = {
                nome: "Ana",
                idade: 25,
                saudacao() {
                    return `Olá, meu nome é ${this.nome}!`;
                }
            };
            
            output.innerHTML += `pessoa.nome: ${pessoa.nome}<br>`;
            output.innerHTML += `pessoa.idade: ${pessoa.idade}<br>`;
            output.innerHTML += `pessoa.saudacao(): ${pessoa.saudacao()}<br><br>`;
            
            // Adicionando nova propriedade
            pessoa.profissao = "Desenvolvedora";
            output.innerHTML += `Nova propriedade: pessoa.profissao = "${pessoa.profissao}"`;
        }
        
        function exemploPromises() {
            let output = document.getElementById('promises-output');
            output.innerHTML = 'Simulando operação assíncrona...<br>';
            
            // Criando uma Promise
            const fetchData = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("Dados recebidos com sucesso!");
                    }, 1500);
                });
            };
            
            // Usando then/catch
            fetchData()
                .then(result => {
                    output.innerHTML += result;
                })
                .catch(error => {
                    output.innerHTML += error;
                });
        }
        
        function exemploDOM() {
            let output = document.getElementById('dom-output');
            
            // Criando um elemento
            const novoElemento = document.createElement('div');
            novoElemento.innerHTML = '<p>Este elemento foi criado e adicionado via JavaScript!</p>';
            novoElemento.style.backgroundColor = '#e9ecef';
            novoElemento.style.padding = '10px';
            novoElemento.style.borderRadius = '5px';
            novoElemento.style.marginTop = '10px';
            
            // Adicionando ao DOM
            output.innerHTML = '';
            output.appendChild(novoElemento);
        }
        
        function exemploES6() {
            let output = document.getElementById('es6-output');
            output.innerHTML = '';
            
            // Template literals
            const nome = "Carlos";
            const mensagem = `Olá, ${nome}!`;
            output.innerHTML += `Template literal: "${mensagem}"<br><br>`;
            
            // Destructuring
            const [a, b] = [1, 2];
            output.innerHTML += `Destructuring array: a=${a}, b=${b}<br>`;
            
            const {x, y} = {x: 10, y: 20};
            output.innerHTML += `Destructuring objeto: x=${x}, y=${y}<br><br>`;
            
            // Spread operator
            const arr1 = [1, 2, 3];
            const arr2 = [...arr1, 4, 5];
            output.innerHTML += `Spread operator: [${arr2.join(', ')}]<br><br>`;
            
            // Parâmetros padrão
            function saudar(nome = "Visitante") {
                return `Olá, ${nome}!`;
            }
            output.innerHTML += `Parâmetro padrão: "${saudar()}"`;
        }
        
        function exemploEventos() {
            let output = document.getElementById('eventos-output');
            output.innerHTML = '';
            
            // Criando botões para demonstração
            const botao1 = document.createElement('button');
            botao1.textContent = 'Botão 1';
            botao1.className = 'card-button';
            botao1.style.marginRight = '10px';
            
            const botao2 = document.createElement('button');
            botao2.textContent = 'Botão 2';
            botao2.className = 'card-button';
            
            output.appendChild(botao1);
            output.appendChild(botao2);
            
            // Adicionando event listener
            let contador = 0;
            const handleClick = function() {
                contador++;
                output.innerHTML += `<br>${this.textContent} foi clicado ${contador} vezes`;
            };
            
            botao1.addEventListener('click', handleClick);
            botao2.addEventListener('click', handleClick);
        }
