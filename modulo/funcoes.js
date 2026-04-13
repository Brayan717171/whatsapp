
const {contatos} = require('./contatos')

const getListaDeContatos = function(){
    let listaNumero = contatos["whats-users"];
    let resultado = [];
   

    listaNumero.forEach(function (numero){
        resultado.push(numero)
    })

    return resultado

   
};

const getListaDeContaUsuario = function(numero){
    let listaNumero = contatos["whats-users"];
    
    let resultado = false
   listaNumero.forEach(function(usuario){

    if(usuario.number === numero){
        resultado = usuario
    }

   })
    return resultado
  

}

const getListaDadosPessoais = function(numero){
    let listaNumero = contatos["whats-users"];
    
    let resultado = false
   listaNumero.forEach(function(usuario){

    if(usuario.number === numero){
        resultado = usuario.contacts.map(function(contato) {
            return {
              name: contato.name,
              image: contato.image,
              description: contato.description
            };
          });
    }

   })
    return resultado
  

}

const getListaDadosPessoaisConversas = function(numero){
    let listaNumero = contatos["whats-users"];
    
    let resultado = false
   listaNumero.forEach(function(usuario){

    if(usuario.number === numero){
        resultado = usuario.contacts.map(function(contato) {
            return contato.messages;
          });
    }

   })
    return resultado
  

}

const getListaDadosUsuarioContato = function(numero, nome){
    let listaNumero = contatos["whats-users"];
    
    let resultado = false
   listaNumero.forEach(function(usuario){

    if(usuario.number === numero || usuario.contacts === nome){
        resultado = usuario.contacts.map(function(contato) {
            return {
                usuario: usuario.nickname,
                numero: usuario.number,
                contato: contato.name,
                conversas: contato.messages
            }
          });
    }

   })
    return resultado
  

}

const getFiltroPalavraChave = function(palavra, numero, nomeContato) {
    let listaNumero = contatos["whats-users"];
    
    let resultado = [];

    listaNumero.forEach(function(usuario) {

        // filtra pelo número do usuário
        if (usuario.number === numero) {

            usuario.contacts.forEach(function(contato) {

                // filtra pelo nome do contato
                if (contato.name === nomeContato) {

                    // mensagem.content texto da mensagem
                    // includes() verifica se contém a palavra
                    const mensagensFiltradas = contato.messages.filter(function(mensagem) {
                        return mensagem.content.toLowerCase().includes(palavra.toLowerCase());
                    });

                    // só adiciona se tiver resultado
                    if (mensagensFiltradas.length > 0) {
                        resultado.push({
                            usuario: usuario.nickname,
                            numero: usuario.number,
                            contato: contato.name,
                            conversas: mensagensFiltradas
                        });
                    }
                }
            });
        }
    });

    return resultado.length > 0 ? resultado : false;
}

//console.log(getListaDeContatos())

//console.log(getListaDeContaUsuario('11987876567'))

//console.log(getlistaDadosPessoais('11987876567'))

//console.log(getlistaDadosPessoaisConversas('11966578996'))

//console.log(getFiltroPalavraChave("o", "11987876567", "John Doe"))

module.exports = {
    getListaDeContatos,        
    getListaDeContaUsuario,    
    getlistaDadosPessoais: getListaDadosPessoais,
    getlistaDadosPessoaisConversas: getListaDadosPessoaisConversas,
    getlistaDadosUsuarioContato: getListaDadosUsuarioContato,
    getFiltroPalavraChave
}