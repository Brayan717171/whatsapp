const assert = require('assert');
const {
    getListaDeContatos,
    getListaDeContaUsuario,
    getlistaDadosPessoais,
    getlistaDadosPessoaisConversas,
    getlistaDadosUsuarioContato,
    getFiltroPalavraChave
} = require('./funcoes');

// ──────────────────────────────────────────────
// Utilitário de teste
// ──────────────────────────────────────────────
let passou = 0;
let falhou = 0;

function teste(descricao, fn) {
    try {
        fn();
        console.log(`  ✅  ${descricao}`);
        passou++;
    } catch (err) {
        console.log(`  ❌  ${descricao}`);
        console.log(`       → ${err.message}`);
        falhou++;
    }
}

// ──────────────────────────────────────────────
// getListaDeContatos
// ──────────────────────────────────────────────
console.log('\n📋  getListaDeContatos');

teste('deve retornar um array', () => {
    const resultado = getListaDeContatos();
    assert.strictEqual(Array.isArray(resultado), true);
});

teste('deve retornar pelo menos um usuário', () => {
    const resultado = getListaDeContatos();
    assert.ok(resultado.length > 0, 'Array vazio');
});

teste('cada item deve ter as propriedades: number, nickname, contacts', () => {
    const resultado = getListaDeContatos();
    resultado.forEach(u => {
        assert.ok('number'   in u, 'Falta "number"');
        assert.ok('nickname' in u, 'Falta "nickname"');
        assert.ok('contacts' in u, 'Falta "contacts"');
    });
});

// ──────────────────────────────────────────────
// getListaDeContaUsuario
// ──────────────────────────────────────────────
console.log('\n👤  getListaDeContaUsuario');

teste('número válido deve retornar o objeto do usuário', () => {
    const resultado = getListaDeContaUsuario('11987876567');
    assert.ok(resultado !== false, 'Esperava objeto, recebeu false');
    assert.strictEqual(resultado.number, '11987876567');
    assert.strictEqual(resultado.nickname, 'Ricky');
});

teste('número inexistente deve retornar false', () => {
    const resultado = getListaDeContaUsuario('00000000000');
    assert.strictEqual(resultado, false);
});

teste('não deve retornar dados de outro usuário', () => {
    const resultado = getListaDeContaUsuario('11987876567');
    assert.notStrictEqual(resultado.nickname, 'Joe');
});

// ──────────────────────────────────────────────
// getlistaDadosPessoais
// ──────────────────────────────────────────────
console.log('\n🪪  getlistaDadosPessoais');

teste('deve retornar array de contatos com name, image e description', () => {
    const resultado = getlistaDadosPessoais('11987876567');
    assert.ok(Array.isArray(resultado), 'Deve ser array');
    resultado.forEach(c => {
        assert.ok('name'        in c, 'Falta "name"');
        assert.ok('image'       in c, 'Falta "image"');
        assert.ok('description' in c, 'Falta "description"');
    });
});

teste('não deve expor a propriedade "messages" nos dados pessoais', () => {
    const resultado = getlistaDadosPessoais('11987876567');
    resultado.forEach(c => {
        assert.ok(!('messages' in c), '"messages" não deveria aparecer aqui');
    });
});

teste('número inválido deve retornar false', () => {
    assert.strictEqual(getlistaDadosPessoais('99999999999'), false);
});

// ──────────────────────────────────────────────
// getlistaDadosPessoaisConversas
// ──────────────────────────────────────────────
console.log('\n💬  getlistaDadosPessoaisConversas');

teste('deve retornar array de arrays de mensagens', () => {
    const resultado = getlistaDadosPessoaisConversas('11987876567');
    assert.ok(Array.isArray(resultado), 'Deve ser array');
    resultado.forEach(msgs => {
        assert.ok(Array.isArray(msgs), 'Cada item deve ser um array de mensagens');
    });
});

teste('cada mensagem deve ter sender, content e time', () => {
    const resultado = getlistaDadosPessoaisConversas('11987876567');
    resultado.forEach(msgs => {
        msgs.forEach(msg => {
            assert.ok('sender'  in msg, 'Falta "sender"');
            assert.ok('content' in msg, 'Falta "content"');
            assert.ok('time'    in msg, 'Falta "time"');
        });
    });
});

teste('número inválido deve retornar false', () => {
    assert.strictEqual(getlistaDadosPessoaisConversas('00000000000'), false);
});

// ──────────────────────────────────────────────
// getlistaDadosUsuarioContato
// ──────────────────────────────────────────────
console.log('\n🔗  getlistaDadosUsuarioContato');

teste('deve retornar array com usuario, numero, contato e conversas', () => {
    const resultado = getlistaDadosUsuarioContato('11987876567', 'Ana Maria');
    assert.ok(Array.isArray(resultado), 'Deve ser array');
    resultado.forEach(item => {
        assert.ok('usuario'  in item, 'Falta "usuario"');
        assert.ok('numero'   in item, 'Falta "numero"');
        assert.ok('contato'  in item, 'Falta "contato"');
        assert.ok('conversas' in item, 'Falta "conversas"');
    });
});

teste('o campo usuario deve corresponder ao nickname do usuário', () => {
    const resultado = getlistaDadosUsuarioContato('11987876567', 'Ana Maria');
    assert.ok(resultado !== false);
    assert.strictEqual(resultado[0].usuario, 'Ricky');
});

teste('número inexistente deve retornar false', () => {
    const resultado = getlistaDadosUsuarioContato('00000000000', 'Ninguém');
    assert.strictEqual(resultado, false);
});

// ──────────────────────────────────────────────
// getFiltroPalavraChave
// ──────────────────────────────────────────────
console.log('\n🔍  getFiltroPalavraChave');

teste('deve encontrar mensagens que contenham a palavra-chave (case insensitive)', () => {
    // "how" aparece em mensagens do John Doe e Ana Maria do usuário 11987876567
    const resultado = getFiltroPalavraChave('how', '11987876567', 'Ana Maria');
    assert.ok(resultado !== false, 'Esperava resultados');
    assert.ok(resultado.length > 0);
    resultado[0].conversas.forEach(msg => {
        assert.ok(
            msg.content.toLowerCase().includes('how'),
            `Mensagem sem a palavra-chave: "${msg.content}"`
        );
    });
});

teste('busca case insensitive: "HOW" deve encontrar o mesmo que "how"', () => {
    const r1 = getFiltroPalavraChave('how', '11987876567', 'Ana Maria');
    const r2 = getFiltroPalavraChave('HOW', '11987876567', 'Ana Maria');
    assert.deepStrictEqual(r1, r2);
});

teste('palavra inexistente na conversa deve retornar false', () => {
    const resultado = getFiltroPalavraChave('xyzxyzxyz', '11987876567', 'Ana Maria');
    assert.strictEqual(resultado, false);
});

teste('contato inexistente deve retornar false', () => {
    const resultado = getFiltroPalavraChave('hello', '11987876567', 'Contato Fantasma');
    assert.strictEqual(resultado, false);
});

teste('usuário inexistente deve retornar false', () => {
    const resultado = getFiltroPalavraChave('hello', '00000000000', 'Ana Maria');
    assert.strictEqual(resultado, false);
});

// ──────────────────────────────────────────────
// Resultado final
// ──────────────────────────────────────────────
console.log('\n' + '─'.repeat(45));
console.log(`  Total: ${passou + falhou} | ✅ Passou: ${passou} | ❌ Falhou: ${falhou}`);
console.log('─'.repeat(45) + '\n');

if (falhou > 0) process.exit(1);
