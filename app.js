let listaDeNumerosSorteados = [];
let numeroLimite = 15;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let limiteTentativas = 5;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);
}

exibirMensagemInicial();
inicializacaoDoJogo();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute < 1 || chute > numeroLimite){
        alert ('Digite um número válido!');
        limparCampo();
        return;
    }
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        desabilitarChuteEHabilitarReiniciar();
    } else {
        let avisoTentativas = `Tentativa ${tentativas} de ${limiteTentativas}.`;

        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor. ' + avisoTentativas);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior. ' + avisoTentativas);
        }
        tentativas++;
        limparCampo();
    }
    if (tentativas > limiteTentativas){
        derrotaPorExcessoDeTentativas();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    inicializacaoDoJogo();
    
}

function inicializacaoDoJogo(){
    document.getElementById('chutar').removeAttribute('disabled');
}

function derrotaPorExcessoDeTentativas(){
    let textoDeDerrota = `Suas tentativas acabaram. O número secreto era ${numeroSecreto}.`
    exibirTextoNaTela('p', textoDeDerrota);
    desabilitarChuteEHabilitarReiniciar();
}

function desabilitarChuteEHabilitarReiniciar(){
    document.getElementById('chutar').setAttribute('disabled', true);
    document.getElementById('reiniciar').removeAttribute('disabled');
}