import express, { json } from "express";
import routes from "./routes.js";
import { AppDataSource } from "./database/config.js";

const server = express();
server.use(express.json());
server.use("/", routes);

server.get("/teste", (request, response) => {
    return response.status(200).send("teste");
});

AppDataSource.initialize().then(() => {
    console.log("Conexão realizada com sucesso!!!");
}).catch((err) => {
    console.log("Falha ao conectar ao banco de dados: ", err);
})

server.listen(3333, () => {
    console.log("The engine is running, keep on rolling baby!!!")
})