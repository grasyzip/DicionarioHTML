// script.js

// Função para exibir resultados na página
function exibirResultado(mensagem) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML += `<p>${new Date().toLocaleTimeString()}: ${mensagem}</p>`;
    resultadoDiv.scrollTop = resultadoDiv.scrollHeight;
}

// Limpar resultados
function limparResultados() {
    document.getElementById('resultado').innerHTML = '';
}

// ========== CALLBACKS ==========
function fazerAlgoAsync(callback) {
    setTimeout(() => {
        callback('Dados processados via Callback');
    }, 1000);
}

function usarCallbacks() {
    limparResultados();
    exibirResultado('Iniciando operação com Callbacks...');
    
    fazerAlgoAsync((resultado) => {
        exibirResultado(resultado);
        exibirResultado('Callback concluído!');
    });
}

// ========== PROMISES ==========
function carregarDados() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.3;
            if (sucesso) {
                resolve('Dados carregados com sucesso via Promise');
            } else {
                reject('Erro ao carregar dados via Promise');
            }
        }, 1500);
    });
}

function usarPromises() {
    limparResultados();
    exibirResultado('Iniciando operação com Promises...');
    
    carregarDados()
        .then(resultado => {
            exibirResultado(resultado);
            exibirResultado('Promise resolvida com sucesso!');
        })
        .catch(erro => {
            exibirResultado(erro);
            exibirResultado('Promise rejeitada!');
        });
}

// ========== ASYNC/AWAIT ==========
async function processarDados() {
    try {
        const resultado = await carregarDados();
        exibirResultado(resultado.replace('via Promise', 'via Async/Await'));
        exibirResultado('Async/Await concluído com sucesso!');
        return resultado;
    } catch (erro) {
        exibirResultado(erro.replace('via Promise', 'via Async/Await'));
        exibirResultado('Async/Await falhou!');
        throw erro;
    }
}

function usarAsyncAwait() {
    limparResultados();
    exibirResultado('Iniciando operação com Async/Await...');
    
    processarDados()
        .then(() => {
            exibirResultado('Operação Async/Await finalizada!');
        })
        .catch(() => {
            exibirResultado('Operação Async/Await finalizada com erro!');
        });
}

// ========== API FETCH ==========
async function buscarPosts() {
    limparResultados();
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '<p>Carregando posts...</p>';
    
    try {
        exibirResultado('Buscando posts da API...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const posts = await response.json();
        exibirResultado(`Posts carregados: ${posts.length}`);
        
        // Exibir posts na página
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body.substring(0, 100)}...</p>
                <small>Post ID: ${post.id}</small>
            </div>
        `).join('');
        
    } catch (erro) {
        exibirResultado(`Erro ao buscar posts: ${erro.message}`);
        postsContainer.innerHTML = `<p style="color: red;">Erro: ${erro.message}</p>`;
    }
}

// Adicionar estilos dinâmicos
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        #resultado {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 15px;
            margin: 20px 0;
            max-height: 200px;
            overflow-y: auto;
            font-family: monospace;
            border-radius: 5px;
        }
        
        #resultado p {
            margin: 5px 0;
            padding: 3px;
            border-bottom: 1px solid #eee;
        }
        
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        .post {
            background-color: white;
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .post h3 {
            color: #333;
            margin-top: 0;
        }
        
        .post p {
            color: #666;
        }
        
        .post small {
            color: #999;
        }
        
        pre {
            background-color: #f8f8f8;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #4CAF50;
        }
    `;
    document.head.appendChild(style);
    
    // Mensagem inicial
    exibirResultado('Página carregada. Clique nos botões para testar programação assíncrona!');
});