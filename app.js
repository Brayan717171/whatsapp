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
 * 
 ***************************************************/

//Import da dependencia para criar API
const express = require('express')
const cors = require('cors')
const funcoes = require('./modulo/funcoes')

// Inicializa uma nova aplicação Express
const app = express()

// Define as configurações do CORS (Cross-Origin Resource Sharing)
const corsOption = {
    // Permite que requisições venham de qualquer origem (o '*' é um coringa)
    origin: ['*'], 
    
    // Restringe o acesso apenas ao método HTTP GET
    methods: 'GET', 
    
    // Define quais cabeçalhos o cliente pode enviar na requisição
    allowedHeaders: ['content-type', 'Authorization'], 
}


app.use(cors(corsOption));
