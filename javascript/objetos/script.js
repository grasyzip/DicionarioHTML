const saida = document.getElementById('saida');

// Objeto literal
const livro = {
    titulo: 'JavaScript: O Guia Definitivo',
    autor: 'David Flanagan',
    paginas: 1080,
    editora: 'Bookman',
    informacoes: function() {
        return `${this.titulo} por ${this.autor}, ${this.paginas} páginas`;
    }
};

function criarObjeto() {
    saida.innerHTML = `
        <h3>Objeto Livro:</h3>
        <pre>${JSON.stringify(livro, null, 2)}</pre>
        <p>${livro.informacoes()}</p>
    `;
}

function acessarPropriedades() {
    saida.innerHTML = `
        <h3>Acessando Propriedades:</h3>
        <ul>
            <li>livro.titulo: ${livro.titulo}</li>
            <li>livro['autor']: ${livro['autor']}</li>
            <li>Propriedades: ${Object.keys(livro).join(', ')}</li>
        </ul>
    `;
}

function usarMetodos() {
    // Adicionando nova propriedade dinamicamente
    livro.anoPublicacao = 2020;
    
    // Adicionando novo método
    livro.resumo = function() {
        return `${this.titulo} foi publicado por ${this.editora} em ${this.anoPublicacao || 'ano desconhecido'}.`;
    };
    
    saida.innerHTML = `
        <h3>Métodos do Objeto:</h3>
        <p>${livro.informacoes()}</p>
        <p>${livro.resumo()}</p>
    `;
}

// Classe
class Aluno {
    constructor(nome, curso, matricula) {
        this.nome = nome;
        this.curso = curso;
        this.matricula = matricula;
        this.notas = [];
    }
    
    adicionarNota(nota) {
        this.notas.push(nota);
    }
    
    calcularMedia() {
        if (this.notas.length === 0) return 0;
        const soma = this.notas.reduce((total, nota) => total + nota, 0);
        return soma / this.notas.length;
    }
    
    situacao() {
        const media = this.calcularMedia();
        return media >= 7 ? 'Aprovado' : media >= 5 ? 'Recuperação' : 'Reprovado';
    }
}

function criarClasse() {
    const aluno1 = new Aluno('Maria', 'Engenharia', '2023001');
    aluno1.adicionarNota(8.5);
    aluno1.adicionarNota(7.0);
    aluno1.adicionarNota(9.2);
    
    const aluno2 = new Aluno('Carlos', 'Medicina', '2023002');
    aluno2.adicionarNota(6.0);
    aluno2.adicionarNota(4.5);
    aluno2.adicionarNota(5.8);
    
    saida.innerHTML = `
        <h3>Exemplo de Classe:</h3>
        <table>
            <tr>
                <th>Nome</th>
                <th>Curso</th>
                <th>Notas</th>
                <th>Média</th>
                <th>Situação</th>
            </tr>
            <tr>
                <td>${aluno1.nome}</td>
                <td>${aluno1.curso}</td>
                <td>${aluno1.notas.join(', ')}</td>
                <td>${aluno1.calcularMedia().toFixed(2)}</td>
                <td>${aluno1.situacao()}</td>
            </tr>
            <tr>
                <td>${aluno2.nome}</td>
                <td>${aluno2.curso}</td>
                <td>${aluno2.notas.join(', ')}</td>
                <td>${aluno2.calcularMedia().toFixed(2)}</td>
                <td>${aluno2.situacao()}</td>
            </tr>
        </table>
    `;

}
