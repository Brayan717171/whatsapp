const express = require('express')
const cors = require('cors')
const funcoes = require('./modulo/funcoes')

const app = express()

const corsOption = {
    origin: '*',  
    methods: 'GET',
    allowedHeaders: ['content-type', 'Authorization'],
}

app.use(cors(corsOption));

// Retorna todos os usuários
app.get('/v1/whatsapp/todos/dados/usuario', (req, res) => {
    let usuarios = funcoes.getListaDeContatos()
    res.status(200).json(usuarios)
});

// Retorna dados de um usuário pelo número
app.get('/v1/whatsapp/usuarios/:numero', (req, res) => {
    let { numero } = req.params
    let dados = funcoes.getListaDeContaUsuario(numero)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Numero '${numero}' não encontrado.` })
    }
});

app.get('/v1/whatsapp/usuarios/pessoais/:numero', (req, res) => {
    let { numero } = req.params
    
    let dados = funcoes.getListaDadosPessoais(numero)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Numero '${numero}' não encontrado.` })
    }
});

app.get('/v1/whatsapp/usuarios/conversas/:numero', (req, res) => {
    let { numero } = req.params
    
    let dados = funcoes.getListaDadosPessoaisConversas(numero)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Numero '${numero}' não encontrado.` })
    }
});

app.get('/v1/whatsapp/usuarios/contato/conversas', (req, res) => {
    let { numero, nome } = req.query
    let dados = funcoes.getListaDadosUsuarioContato(numero, nome)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Dados não encontrados para o contato '${nome}'.` })
    }
});

app.get('/v1/whatsapp/usuarios/filtro/palavra', (req, res) => {
    let { numero, nomeContato, palavra } = req.query
    
    
    let dados = funcoes.getFiltroPalavraChave(palavra, numero, nomeContato)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Palavra '${palavra}' não encontrada.` })
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log(`✅ API rodando na porta ${PORT} e aguardando novas requisições`);
});
