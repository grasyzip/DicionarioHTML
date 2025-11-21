// script.js - Main functionality for async-arrays page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize example buttons
    initExampleButtons();
    
    // Initialize search functionality
    initSearch();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Example buttons functionality
function initExampleButtons() {
    const buttons = document.querySelectorAll('.btn-exemplo');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            // Toggle display
            if (targetElement.style.display === 'none' || targetElement.style.display === '') {
                targetElement.style.display = 'block';
                this.textContent = 'Ocultar Exemplo';
            } else {
                targetElement.style.display = 'none';
                this.textContent = 'Ver Exemplo';
            }
        });
    });
}

// Execute code examples
function executarExemplo(exampleId) {
    const resultadoElement = document.getElementById(`resultado-${exampleId.split('-')[1]}`);
    
    try {
        let resultado;
        
        switch(exampleId) {
            case 'exemplo-push':
                let frutas = ['maçã', 'banana'];
                frutas.push('laranja');
                resultado = frutas;
                break;
                
            case 'exemplo-pop':
                let numeros = [10, 20, 30, 40, 50];
                let removido = numeros.pop();
                resultado = `Elemento removido: ${removido}, Array atual: [${numeros}]`;
                break;
                
            case 'exemplo-unshift':
                let cores = ['verde', 'azul'];
                cores.unshift('vermelho');
                resultado = cores;
                break;
                
            case 'exemplo-splice':
                let letras = ['a', 'b', 'c', 'd'];
                letras.splice(1, 2);
                resultado = letras;
                break;
                
            case 'exemplo-outros':
                let arr1 = [1, 2];
                let arr2 = [3, 4];
                let concatenado = arr1.concat(arr2);
                let mapeado = [1, 2, 3].map(n => n * 2);
                resultado = `Concat: [${concatenado}], Map: [${mapeado}]`;
                break;
                
            default:
                resultado = 'Exemplo não implementado';
        }
        
        resultadoElement.innerHTML = `<strong>Resultado:</strong> ${JSON.stringify(resultado)}`;
        resultadoElement.className = 'resultado sucesso';
        
    } catch (error) {
        resultadoElement.innerHTML = `<strong>Erro:</strong> ${error.message}`;
        resultadoElement.className = 'resultado erro';
    }
}

// Async functionality
function usarCallbacks() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Executando com Callbacks...';
    
    setTimeout(function() {
        resultado.innerHTML = 'Callback executado após 1 segundo!';
        resultado.className = 'resultado sucesso';
    }, 1000);
}

function usarPromises() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Executando com Promises...';
    
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise resolvida após 1.5 segundos!');
        }, 1500);
    })
    .then(mensagem => {
        resultado.innerHTML = mensagem;
        resultado.className = 'resultado sucesso';
    });
}

async function usarAsyncAwait() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Executando com Async/Await...';
    
    try {
        const mensagem = await new Promise((resolve) => {
            setTimeout(() => {
                resolve('Async/Await concluído após 2 segundos!');
            }, 2000);
        });
        
        resultado.innerHTML = mensagem;
        resultado.className = 'resultado sucesso';
    } catch (error) {
        resultado.innerHTML = `Erro: ${error.message}`;
        resultado.className = 'resultado erro';
    }
}

async function buscarPosts() {
    const resultado = document.getElementById('resultado');
    const postsContainer = document.getElementById('posts-container');
    
    resultado.innerHTML = 'Buscando posts da API...';
    postsContainer.innerHTML = '';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        
        const posts = await response.json();
        
        resultado.innerHTML = `Encontrados ${posts.length} posts!`;
        resultado.className = 'resultado sucesso';
        
        // Display posts
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <h5>${post.title}</h5>
                <p>${post.body.substring(0, 100)}...</p>
            `;
            postsContainer.appendChild(postElement);
        });
        
    } catch (error) {
        resultado.innerHTML = `Erro ao buscar posts: ${error.message}`;
        resultado.className = 'resultado erro';
        
        // Fallback data for demo purposes
        if (error.message.includes('Failed to fetch')) {
            resultado.innerHTML += '<br><em>Dica: Esta é uma demonstração offline. Em um ambiente real, os dados viriam da API.</em>';
        }
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const searchTerm = document.getElementById('searchTerm');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();
        
        if (term.length === 0) {
            hideNoResults();
            showAllCards();
            return;
        }
        
        searchTerm.textContent = term;
        filterCards(term);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
}

function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.tag-card');
    let foundResults = false;
    
    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        
        if (cardText.includes(searchTerm)) {
            card.style.display = 'block';
            foundResults = true;
            
            // Highlight matching text
            highlightText(card, searchTerm);
        } else {
            card.style.display = 'none';
        }
    });
    
    if (foundResults) {
        hideNoResults();
    } else {
        showNoResults();
    }
}

function highlightText(element, searchTerm) {
    // Remove previous highlights
    const highlights = element.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
    
    // Simple text node highlighting
    walkTextNodes(element, searchTerm);
}

function walkTextNodes(element, searchTerm) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    const nodes = [];
    
    while (node = walker.nextNode()) {
        nodes.push(node);
    }
    
    nodes.forEach(node => {
        if (node.textContent.toLowerCase().includes(searchTerm)) {
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.style.backgroundColor = '#ffeb3b';
            span.style.padding = '2px 0';
            
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const newText = node.textContent.replace(regex, '<span class="search-highlight" style="background-color: #ffeb3b; padding: 2px 0;">$1</span>');
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newText;
            
            const parent = node.parentNode;
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, node);
            }
            parent.removeChild(node);
        }
    });
}

function showAllCards() {
    const cards = document.querySelectorAll('.tag-card');
    cards.forEach(card => {
        card.style.display = 'block';
        
        // Remove highlights
        const highlights = card.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    });
}

function showNoResults() {
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = 'block';
    }
}

function hideNoResults() {
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = 'none';
    }
}

// Utility function to simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}