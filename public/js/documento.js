//Esse arquivo é resposável pelo lado do cliente
import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const socket = io();
//Recuperando os parâmetros da URL da página do documento
const params = new URLSearchParams(window.location.search);
const nomeDocumento = params.get("nome");//Recuperando o valor que estiver no param "nome"

//Recuperando os elementos da página HTML
const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById("titulo-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo"; //Definindo o titulo da página

selecionarDocumento(nomeDocumento);//Função que seleciona e emite um evento junto ao nome do documento

//Escutando o evento de keyup
textoEditor.addEventListener("keyup", () => {
    //Chamando a função que repassa o texto do input para o socket emitir um evento
    emitirTextoEditor({
        texto: textoEditor.value, //valor do digitado no input
        nomeDocumento //nome do documento que está sendo escrito o texto
    });
})
//Função que atualiza o texto do input
function atualizaCampoTexto(texto) { 
    textoEditor.value = texto;
}

export {atualizaCampoTexto};