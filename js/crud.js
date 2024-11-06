/******************************************************
 * objetivo: realizar cadastro, consulta, edicao e exclusao
 * data: 29/10/24
 * autor: Peu e Leonardo
 * Versao: 1.0
 ******************************************************/
//
const botaoSalvar = document.getElementById("Salvar")




// funcao para criar um novo livro no BD 
const postLivros = async function(){

    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'

    //receber dados do formulário
    let titulo = document.getElementById('title')
    let descricao = document.getElementById('subtitle')
    let foto = document.getElementById('image')
    let valor = document.getElementById('price')

    //cria um objeto do tipo JSON {} / cria um objeto do tipo array []
   let livroJSON = {}
    // criando atributos no Json e colocando valores
   livroJSON.title = titulo.value
   livroJSON.subtitle = descricao.value
   livroJSON.image = foto.value
   livroJSON.price = valor.value

   let response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(livroJSON) /* forçando a conversao json */

   })

  if ( response.status == 201){
    alert("Inserido com sucesso")
  } else{
    alert("Não foi possivel inserir os registros, verifique os dados enviados")
  }

}
// atualizar livro existente
const putLivro = function(){

}

// funcao para deletar livro
const deleteLivro = function(){
    
}
// listar livro
const getLivros = async function(){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

        //execute a URL atraves do fetch
    let response = await fetch(url)

        //converte os dados em json
    let dados = await response.json()
    //percorre a array de livros da API


    let divlistDados = document.getElementById("listDados")
    
    
    
    dados.books.forEach(function(livro){
        //  cria o elemento html
        let divDados = document.createElement('div')
        let divTitle = document.createElement("div")
        let divSubTitle = document.createElement("div")
        let divPrice= document.createElement("div")
        let divOpcoes = document.createElement("div")
        let spanEditar = document.createElement('span')
        let imgEditar = document.createElement('img')
        let spanExcluir = document.createElement('span')
        let imgExcluir = document.createElement('img')


        // adicipna os atributos
        divDados.setAttribute('id','dados')
        divDados.setAttribute('class','linha dados')
        imgEditar.setAttribute("src", "./icones/editar.png")
        imgEditar.setAttribute('idLivro', livro.id)
        imgExcluir.setAttribute("src", "./icones/excluir.png")
        imgExcluir.setAttribute('idLivro', livro.id)

        // adiciona o conteudo na array nos elementos html
        divTitle.innerText = livro.title
        divSubTitle.innerText = livro.subtitle
        divPrice.innerText = livro.price
    

        
        // associa o elemento ao seu elemento pai
        divlistDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        spanEditar.appendChild(imgEditar)
        divOpcoes.appendChild(spanExcluir)
        spanExcluir.appendChild(imgExcluir)
        
        // elemento criado dentro do foreach, o eventlistener fica dentro do foreach
        
        //imgExcluir.addEventListener('click', )
    })

}
// funcao para buscar o livro pelo id
const getBuscarLivro = function(){

}




botaoSalvar.addEventListener("click",function(){
    postLivros()
})

window.addEventListener('load', function(){
    getLivros()
})