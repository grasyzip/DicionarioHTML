function alterarConteudo() {
    document.getElementById('conteudo').innerHTML = '<h3>Conteúdo alterado com sucesso!</h3><p>O JavaScript permite modificar o HTML dinamicamente.</p>';
}

function adicionarElemento() {
    const novoItem = document.createElement('li');
    novoItem.textContent = 'Novo item adicionado em: ' + new Date().toLocaleTimeString();
    document.getElementById('conteudo').appendChild(novoItem);
}

function removerElemento() {
    const conteudo = document.getElementById('conteudo');
    if (conteudo.lastChild) {
        conteudo.removeChild(conteudo.lastChild);
    }
}

function alterarEstilo() {
    const conteudo = document.getElementById('conteudo');
    conteudo.style.backgroundColor = getRandomColor();
    conteudo.style.padding = '20px';
    conteudo.style.border = '2px solid #333';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}