//Funções que serão executadas no documento.js
import { atualizaCampoTexto } from "./documento.js";

const socket = io(); //instanciando o socket

//Parâmetros = nome: nome do documento
function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaCampoTexto(texto); //Função que altera o value do campoTexto
    });
}

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados)
}

//Escutando o evento lançado pelo backend direcionando a mensagem para a sua devida sala
socket.on("texto_editor_clientes", (texto) => {
    atualizaCampoTexto(texto); //Função que altera o value do campoTexto
})

export {emitirTextoEditor, selecionarDocumento};