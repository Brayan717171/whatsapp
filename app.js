/***************************************************
 * Objetivo: Arquivo responsável pela criação da API de whatsApp
 * Data: 08/04/2026
 * Autor: Brayan
 * Versão: 1.0 
 * 
 * Instalação do EXPRESS - npm install express --save
 *  Dependencia responsavel pela utilização do protocolo HTTP  para 
 *  Criar uma API
 * 
 * Instalação do CORS - npm install cors --save
 *  Dependencia responsavel pela configuração a serem realizadas 
 *  para permissao de acesso a API
 * 
 ***************************************************/

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
    let dados = funcoes.getlistaDadosPessoais(numero)

    if (dados) {  
        res.status(200).json(dados)
    } else {
        res.status(404).json({ erro: `Numero '${numero}' não encontrado.` })
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log(`✅ API rodando na porta ${PORT} e aguardando novas requisições`);
});
