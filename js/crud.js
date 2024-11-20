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
    getLivros()
  } else{
    alert("Não foi possivel inserir os registros, verifique os dados enviados")
  }

}
// atualizar livro existente
const putLivro = async function(){
  //recupera o id q foi armazenado na funcao do getBuscarLivro
  let id = sessionStorage.getItem('idLivro')

  let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/atualizar/livro/' + id

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
  method: 'PUT',
  mode: 'cors',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(livroJSON) /* forçando a conversao json */

 })

if ( response.status == 200){
  alert("Atualizado com sucesso")
  getLivros()
} else{
  alert("Não foi possivel inserir os registros, verifique os dados enviados")
}


  
}

// funcao para deletar livro
const deleteLivro = async function(idLivro){
  //  console.log(id)
 
  let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/' + idLivro

  let response = await fetch(url, {
    method: 'DELETE'

  })

  if (response.status == 200){
    alert("Deletado com sucesso")
    getLivros()
  } else{
    alert("Não foi possivel realizer a exclusao desse registro")
  }
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

      // ele limpa a lista de dados, antes de carregar uma nova lista
    divlistDados.innerText = ''
    
    
    
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
            // funcao criada para excluir
        imgExcluir.addEventListener('click',function(){
            let resposta = confirm("Deseja deletar o " + livro.title + "?")
                // pegar o atributo idLivro do front, quando acontecer o click

                if (resposta){
                    let id = imgExcluir.getAttribute('idLivro')
                    // chama a funcao deleteLivro, dando o id como parametro
                    deleteLivro(id)
                    
                } 
           
            
        })

        imgEditar.addEventListener("click", function(){
          let id = imgEditar.getAttribute("idLivro")
          // chamando a funcao buscar os dados do livro para edicao
          getBuscarLivro(id)
        })
    })

}
// funcao para buscar o livro pelo id
const getBuscarLivro = async function(idLivro){

  let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro/' + idLivro

  let response = await fetch(url)
  let dados = await response.json()

    if (response.status == 200){
      document.getElementById('title').value = dados.books[0].title
      document.getElementById("subtitle").value = dados.books[0].subtitle
      document.getElementById("price").value = dados.books[0].price
      document.getElementById("image").value = dados.books[0].image
      // mudando o texto do botao, de salvar (origem) para atualizar'
      document.getElementById('Salvar').innerText = 'Atualizar'

      //guarda o valor do ID numa variavel de sessao (navegador aberto).
      sessionStorage.setItem('idLivro',idLivro)

    } else {
      alert("Não foi possivel achar e localizar o registro")
    }
}




botaoSalvar.addEventListener("click",function(){
    // ira validar no sistema se é salvar (criando um novo) ou atualizar cadastro
  if (document.getElementById("Salvar").innerText == 'Salvar'){
    postLivros()
  } else if(document.getElementById("Salvar").innerText == 'Atualizar'){
    putLivro()
  }
})

window.addEventListener('load', function(){
    getLivros()
})