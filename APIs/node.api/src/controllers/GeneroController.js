import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import generoModel from "../model/genero.js";
import { IsNull, Like } from "typeorm";
import genero from "../model/genero.js";

const route = express.Router();

const generoTable = AppDataSource.getRepository(generoModel);

// Método GET para receber todos os dados da tabela
route.get("/", async (request, response) => {
    const selectedGenero = await generoTable.findBy({deletedAt: IsNull()})
    return response.status(200).send({message: selectedGenero})
});

//GET para receber um dado específico
route.get("/:id", async (request, response) => {
    const { id } = request.params;
    const selectedGeneroById = await generoTable.findBy({
        id: Like(`%${id}%`),
        deletedAt: IsNull()
    })
    if (selectedGeneroById < 1) {
        return response.status(204).end()
    }
    return response.status(200).send({message: selectedGeneroById})
})

//POST para criar dados
route.post("/", async (request, response) => {
    const {nome_genero} = request.body;

    if (nome_genero < 3) {
        return response.status(400).send({message: "O nome do genero não pode conter menos de três letras!"});
    }
    const dataGenero = generoTable.create({nome_genero});
    await generoTable.save(dataGenero);
    return response.status(200).send({message: "Dados inseridos com sucesso no banco de dados!"})
})

//PUT para alterar dados
route.put("/:id", async (request, response) => {
    const { nome_genero } = request.body;
    const { id } = request.params;

    if (nome_genero < 3) {
        return response.status(400).send({message: "O nome do genero não pode conter menos de três letras!"});
    }
    await generoTable.update({id}, {nome_genero});
    return response.status(200).send({message: "Dados alterados com sucesso!"});
})

//HARD DELETE
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await generoTable.delete({id});
    return response.status(200).send({message: "Dados deletados com sucesso!"})
})

//SOFT DELETE
// route.delete("/:id", async (request, response) => {
//     const { id } = request.params;
//     await generoTable.update({id}), {deletedAt: () => "CURRENT_TIMESTAMP"};
//     return response.status(200).send({message: "Soft delete executado com sucesso!"})
// })

export default route;