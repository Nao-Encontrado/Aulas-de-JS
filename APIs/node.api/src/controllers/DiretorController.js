import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import diretorModel from "../model/diretor.js";
import { IsNull, Like } from "typeorm";
import diretor from "../model/diretor.js";

const route = express.Router();

const diretorTable = AppDataSource.getRepository(diretorModel);

// Método GET para receber todos os dados da tabela
route.get("/", async (request, response) => {
    const selectDiretor = await diretorTable.findBy({deletedAt: IsNull()})

    return response.status(200).send({message: selectDiretor});
});

//GET para receber um dado específico baseado no id do diretor
route.get("/:id", async (request, response) => {
    const { id } = request.params;
    const selectedDiretorByName = await diretorTable.findBy({
        id: Like(`%${id}%`),
        deletedAt: IsNull(),
    })
    if (selectedDiretorByName < 1) {
        return response.status(204).end()
    }

    return response.status(200).send({ message: selectedDiretorByName });
})


// Método POST para criar dados na tabela
route.post("/", async (request, response) => {
    const {nome_diretor, sexo, data_nasc, nacionalidade, foto_diretor} = request.body;

    if (nome_diretor.length < 2) {
        return response.status(400).send({message: "O nome do diretor não pode ser menor do que dois caracteres!"});
    }
    if (sexo.toUpperCase() != "MASCULINO" && sexo.toUpperCase() != "FEMININO") {
        return response.status(400).send({message: "O sexo do diretor não pode ser diferente de masculino ou feminino"});
    }
    if (data_nasc.length < 10) {
        return response.status(400).send({message: "A data de nascimento não pode ser inferior a 10 caracteres"});
    }
    if (nacionalidade.length != 2) {
        return response.status(400).send({message: "Insira uma nacionalidade válida!"});
    }
    if (!foto_diretor.toLowerCase().startsWith("www")) {
        return response.status(400).send({message: "Insira uma foto válida!"})
    }

    const dataDiretor = diretorTable.create({nome_diretor, sexo, data_nasc, nacionalidade, foto_diretor});
    await diretorTable.save(dataDiretor);

    return response.status(200).send({message: "Diretor criado com sucesso!"})
})

route.put("/:id", async (request, response) => {
    const {nome_diretor, sexo, data_nasc, nacionalidade, foto_diretor} = request.body;
    const { id } = request.params;

    if (nome_diretor.length < 2) {
        return response.status(400).send({message: "O nome do diretor não pode ser menor do que dois caracteres!"});
    }
    if (sexo.toUpperCase() != "MASCULINO" && sexo.toUpperCase() != "FEMININO") {
        return response.status(400).send({message: "O sexo do diretor não pode ser diferente de masculino ou feminino"});
    }
    if (data_nasc.length < 10) {
        return response.status(400).send({message: "A data de nascimento não pode ser inferior a 10 caracteres"});
    }
    if (nacionalidade.length != 2) {
        return response.status(400).send({message: "Insira uma nacionalidade válida!"});
    }
    if (!foto_diretor.toLowerCase().startsWith("www")) {
        return response.status(400).send({message: "Insira uma foto válida!"})
    }

    await diretorTable.update({id}, {nome_diretor, sexo, data_nasc, nacionalidade, foto_diretor});

    return response.status(200).send({message: "Dados atualizados com sucesso!"})
})

// Método DELETE para HARD DELETE no banco
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await diretorTable.delete({id});
    return response.status(200).send({message: "Hard delete executado com sucesso!"})
})

// Método DELETE para SOFT DELETE no banco
// route.delete("/:id", async (request, response) => {
//     const { id } = request.params;
//     await diretorTable.update({id}), {deletedAt: () => "CURRENT_TIMESTAMP"}
//     return response.status(200).send({message: "Soft delete executado com sucesso!"})
// })

export default route;

