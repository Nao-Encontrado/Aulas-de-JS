import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import premiacaoModel from "../model/premiacao.js";
import { IsNull, Like } from "typeorm";
import premiacao from "../model/premiacao.js";

const route = express.Router();

const premiacaoTable = AppDataSource.getRepository(premiacaoModel);

// Método GET para receber todos os dados da tabela
route.get("/", async (request, response) => {
    const selectedPremiacao = await premiacaoTable.findBy({deletedAt: IsNull()})
    return response.status(200).send({message: selectedPremiacao})
});

//GET para receber um dado específico
route.get("/:id", async (request, response) => {
    const { id } = request.params;
    const selectedPremiacaoById = await premiacaoTable.findBy({
        id: Like(`%${id}%`),
        deletedAt: IsNull()
    })
    if (selectedPremiacaoById < 1) {
        return response.status(204).end()
    }
    return response.status(200).send({message: selectedPremiacaoById})
})

//POST para criar dados
route.post("/", async (request, response) => {
    const {nome_premiacao, valor_premiacao} = request.body;

    if (nome_premiacao < 4) {
        return response.status(400).send({message: "O nome da premiação não pode conter menos de 4 caracteres!"})
    }
    if (valor_premiacao < 0 || valor_premiacao > 10) {
        return response.status(400).send({message: "O valor da premiação deve ser de 0 a 10!"})
    }

    const dataPremiacao = premiacaoTable.create({nome_premiacao, valor_premiacao});
    await premiacaoTable.save(dataPremiacao);
    return response.status(200).send({message: "Dados criados com sucesso!"})
})

//PUT para alterar dados
route.put("/:id", async (request, response) => {
    const { nome_premiacao, valor_premiacao } = request.body;
    const { id } = request.params;

    if (nome_premiacao < 3) {
        return response.status(400).send({message: "O nome do premiacao não pode conter menos de três letras!"});
    }
    if (valor_premiacao < 0 || valor_premiacao > 10) {
        return response.status(400).send({message: "O valor da premiação deve ser de 0 a 10!"})
    }
    await premiacaoTable.update({id}, {nome_premiacao, valor_premiacao});
    return response.status(200).send({message: "Dados alterados com sucesso!"});
})

//HARD DELETE
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await premiacaoTable.delete({id});
    return response.status(200).send({message: "Dados deletados com sucesso!"})
})

//SOFT DELETE
// route.delete("/:id", async (request, response) => {
//     const { id } = request.params;
//     await premiacaoTable.update({id}), {deletedAt: () => "CURRENT_TIMESTAMP"};
//     return response.status(200).send({message: "Soft delete executado com sucesso!"})
// })

export default route;