import express, { request, response } from "express";1
import { AppDataSource } from "../database/config.js";
import atorModel from "../model/ator.js";
import { IsNull, Like } from "typeorm";
import ator from "../model/ator.js";

const route = express.Router();

const atorTable = AppDataSource.getRepository(atorModel);

// Método GET para receber todos os dados da tabela
route.get("/", async (request, response) => {
    const selectAtor = await atorTable.findBy({deletedAt: IsNull()})

    return response.status(200).send({message: selectAtor});
});

//GET para receber um dado específico baseado no nome do ator
route.get("/:id", async (request, response) => {
    const { id } = request.params;
    const selectedAtorByName = await atorTable.findBy({
        id: Like(`%${id}%`),
        deletedAt: IsNull(),
    })
    if (selectedAtorByName < 1) {
        return response.status(204).end()
    }

    return response.status(200).send({ message: selectedAtorByName });
})


// Método POST para criar dados na tabela
route.post("/", async (request, response) => {
    const {nome_ator, sexo, data_nasc, nacionalidade, foto_ator} = request.body;

    if (nome_ator.length < 2) {
        return response.status(400).send({message: "O nome do ator não pode ser menor do que dois caracteres!"});
    }
    if (sexo.toUpperCase() != "MASCULINO" && sexo.toUpperCase() != "FEMININO") {
        return response.status(400).send({message: "O sexo do ator não pode ser diferente de masculino ou feminino"});
    }
    if (data_nasc.length < 10) {
        return response.status(400).send({message: "A data de nascimento não pode ser inferior a 10 caracteres"});
    }
    if (nacionalidade.length != 2) {
        return response.status(400).send({message: "Insira uma nacionalidade válida!"});
    }
    if (!foto_ator.toLowerCase().startsWith("www")) {
        return response.status(400).send({message: "Insira uma foto válida!"})
    }

    const dataAtor = atorTable.create({nome_ator, sexo, data_nasc, nacionalidade, foto_ator});
    await atorTable.save(dataAtor);

    return response.status(200).send({message: "Ator criado com sucesso!"})
})

route.put("/:id", async (request, response) => {
    const {nome_ator, sexo, data_nasc, nacionalidade, foto_ator} = request.body;
    const { id } = request.params;

    if (nome_ator.length < 2) {
        return response.status(400).send({message: "O nome do ator não pode ser menor do que dois caracteres!"});
    }
    if (sexo.toUpperCase() != "MASCULINO" && sexo.toUpperCase() != "FEMININO") {
        return response.status(400).send({message: "O sexo do ator não pode ser diferente de masculino ou feminino"});
    }
    if (data_nasc.length < 10) {
        return response.status(400).send({message: "A data de nascimento não pode ser inferior a 10 caracteres"});
    }
    if (nacionalidade.length != 2) {
        return response.status(400).send({message: "Insira uma nacionalidade válida!"});
    }
    if (!foto_ator.toLowerCase().startsWith("www")) {
        return response.status(400).send({message: "Insira uma foto válida!"})
    }

    await atorTable.update({id}, {nome_ator, sexo, data_nasc, nacionalidade, foto_ator});

    return response.status(200).send({message: "Dados atualizados com sucesso!"})
})

// Método DELETE para HARD DELETE no banco
// route.delete("/:id", async (request, response) => {
//     const { id } = request.params;
//     await atorTable.delete({id});
//     return response.status(200).send({message: "Hard delete executado com sucesso!"})
// })

// Método DELETE para SOFT DELETE no banco
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await atorTable.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"})
    return response.status(200).send({message: "Soft delete executado com sucesso!"})
})
export default route;
    //TERMINAR DE CRIAR AS CONTROLLERS DE TODOS OS MODELS.