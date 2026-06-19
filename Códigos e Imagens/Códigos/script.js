let biblioteca = JSON.parse(localStorage.getItem("biblioteca")) || [];

function salvarDados(){
    localStorage.setItem(
        "biblioteca",
        JSON.stringify(biblioteca)
    );
}

function adicionarLivro(titulo, genero, capa){

    const existe = biblioteca.find(
        livro => livro.titulo === titulo
    );

    if(existe){
        alert("Livro já adicionado!");
        return;
    }

    biblioteca.push({
        titulo,
        genero,
        capa,
        status:"Próximo"
    });

    salvarDados();

    alert("Livro adicionado à biblioteca!");
}

function excluirLivro(index){

    if(confirm("Deseja excluir este livro?")){

        biblioteca.splice(index,1);

        salvarDados();
        renderizarBiblioteca();
    }
}

function editarLivro(index){

    const novoStatus = prompt(
`Digite um status:

Lendo
Próximo
Finalizado`
    );

    if(!novoStatus) return;

    const statusValido = [
        "Lendo",
        "Próximo",
        "Finalizado"
    ];

    if(!statusValido.includes(novoStatus)){
        alert("Status inválido!");
        return;
    }

    biblioteca[index].status = novoStatus;

    salvarDados();
    renderizarBiblioteca();
}

function criarCard(livro,index){

    return `
        <div class="livro">

            <img
                src="${livro.capa}"
                alt="${livro.titulo}"
                class="capa"
            >

            <h3>${livro.titulo}</h3>

            <p>${livro.genero}</p>

            <div class="acoes">

                <button
                    class="editar"
                    onclick="editarLivro(${index})">
                    Editar
                </button>

                <button
                    class="excluir"
                    onclick="excluirLivro(${index})">
                    Excluir
                </button>

            </div>
        </div>
    `;
}

function renderizarBiblioteca(){

    const lendo = document.getElementById("lendo");
    const proximo = document.getElementById("proximo");
    const finalizado = document.getElementById("finalizado");

    if(!lendo) return;

    lendo.innerHTML = "";
    proximo.innerHTML = "";
    finalizado.innerHTML = "";

    biblioteca.forEach((livro,index)=>{

        const card = criarCard(livro,index);

        if(livro.status === "Lendo"){
            lendo.innerHTML += card;
        }

        else if(livro.status === "Próximo"){
            proximo.innerHTML += card;
        }

        else{
            finalizado.innerHTML += card;
        }

    });

}

renderizarBiblioteca();