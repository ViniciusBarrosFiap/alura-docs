import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { on } from "events";
const app = express();
const port = process.env.PORT || 3000;
const currentPath = url.fileURLToPath(import.meta.url);
const publicRepository = path.join(currentPath, "../../", "public");
const servidorHttp = http.createServer(app);
app.use(express.static(publicRepository));
servidorHttp.listen(port, ()=>console.log(`Servidor rodando na porta ${port}`));
const io = new Server(servidorHttp);
io.on("connection", ()=>{
    console.log("Um cliente se conectou");
});