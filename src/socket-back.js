import io from './servidor.js';

const documentos = [
    {
        nome: "JavaScript",
        texto: "texto JavaScript",
    },
    {
        nome: "Socket.io",
        texto: "texto Socket.IO",
    },
    {
        nome: "Node",
        texto: "texto Node",
    }
];

io.on("connection", (socket)=>{
    console.log("Um cliente se conectou ID: ", socket.id);
    
    //Escutando evento de selecionar evento para entrar na sala com o nome do documento
    socket.on("selecionar_documento", (nome, devolverTexto) => {
        socket.join(nome);

        const documento = encontrarDocumento(nome);
        
        if (documento) {
            devolverTexto(documento.texto);
        };

    })
    
    //Escutando o evento que é emitido quando o texto do input é alterado
    socket.on("texto_editor", ({texto, nomeDocumento}) => { //Ouvindo evento emitido pelo lado do cliente
        const documento = encontrarDocumento(nomeDocumento);

        if(documento) {
            documento.texto = texto;
            //Direicionando a mensagem para a devida sala junto ao texto digitado 
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    })
    
    //Escutando o evento de quando o usuário sai da sala e é desconectado
    socket.on("disconnect", (motivo) => {
        console.log("Um cliente se desconectou", motivo);
    })
});

function encontrarDocumento(nomeDocumento) {
    const documento = documentos.find((documento) => {
        return documento.nome === nomeDocumento;
    })
    return documento;
}