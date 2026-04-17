const {contatos} = require('./contatos')

const getListaDeContatos = function(){
    let listaNumero = contatos["whats-users"];
    let resultado = [];
    listaNumero.forEach(function(numero){
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
};

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
};

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
};


const getListaDadosUsuarioContato = function(numero, nome) {
    let listaNumero = contatos["whats-users"];
    let resultado = [];

    listaNumero.forEach(function(usuario) {
        if (usuario.number === numero) {                  
            usuario.contacts.forEach(function(contato) {
                if (contato.name === nome) {                
                    resultado.push({
                        usuario: usuario.nickname,
                        numero: usuario.number,
                        contato: contato.name,
                        conversas: contato.messages
                    });
                }
            });
        }
    });

    return resultado.length > 0 ? resultado : false;
};

const getFiltroPalavraChave = function(palavra, numero, nomeContato) {
    let listaNumero = contatos["whats-users"];
    let resultado = [];

    listaNumero.forEach(function(usuario) {
        if (usuario.number === numero) {
            usuario.contacts.forEach(function(contato) {
                if (contato.name === nomeContato) {
                    const mensagensFiltradas = contato.messages.filter(function(mensagem) {
                        return mensagem.content.toLowerCase().includes(palavra.toLowerCase());
                    });
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

module.exports = {
    getListaDeContatos,        
    getListaDeContaUsuario,    
    getListaDadosPessoais,
    getListaDadosPessoaisConversas,
    getListaDadosUsuarioContato,
    getFiltroPalavraChave,
   
};