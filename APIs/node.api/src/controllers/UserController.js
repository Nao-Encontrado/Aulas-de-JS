import express, { request } from "express";
import { AppDataSource } from "../database/config.js";
import userModel from "../model/user.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const userTable = AppDataSource.getRepository(userModel);

route.get("/", async (request, response) => {
    const selectedUsers = await userTable.findBy({deletedAt: IsNull()});

    return response.status(200).send({message: selectedUsers});
});

//Método para retornar do banco os usuários que foram pesquisados no front
route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const selectedUserByName = await userTable.findBy({name: Like(`${name}`), deletedAt: IsNull()})
    if (selectedUserByName > 1) {
        return response.status(204).end()
    }
    return response.status(200).send({message: selectedUserByName});
});

//Teste de método GET
route.get("/", (request, response) => {
    return response.status(200).send({
        "name": "Alex",
        "ago": 24,
        "married": false
    });
});

route.get("/teste", (request, response) => {
    return response.status(200).send("Hellow world, motherf*cker");
});

//Método POST 
route.post("/", async (request, response) => {
    const {name, email, password, typeUser} = request.body;

    if (name.length < 2) {
        return response.status(400).send({message: "Nome deve conter mais de 2 caracteres!"});
    }
    if (! email.includes("@")) {
        return response.status(200).send({message: "Email corretamente inserido!"});
    }
    if (password.length < 6) {
        return response.status(400).send({message: "Senha deve conter mais de 6 caracteres!"})
    }
    if (typeUser.toString().toLowerCase() != "admin" && typeUser.toString().toLowerCase() != "comum") {
        return response.status(400).send({message: "Tipos de usuário permitidos: admin, comum!"})
    }

    const dataUser = userTable.create({name, email, password, typeUser});
    await userTable.save(dataUser);

    return response.status(201).send({message:"Usuário cadastrado com sucesso!"})
})

// Método PUT para alteração de dados
route.put("/", async (request, response) => {
    const {name, email, password, typeUser, id} = request.body;
    // const {id} = request.params;
    
    if (name.length < 2) {
        return response.status(400).send({message: "Nome deve conter mais de 2 caracteres!"});
    }
    if (! email.includes("@")) {
        return response.status(200).send({message: "Email corretamente inserido!"});
    }
    if (password.length < 6) {
        return response.status(400).send({message: "Senha deve conter mais de 6 caracteres!"})
    }
    if (typeUser.toString().toLowerCase() != "admin" && typeUser.toString().toLowerCase() != "comum") {
        return response.status(400).send({message: "Tipos de usuário permitidos: admin, comum!"})
    }

    await userTable.update({id}, {name, email, password, typeUser});

    return response.status(201).send({message:"Dados alterados com sucesso!!!"})
})

// Método DELETE pra HARD DELETE no banco
route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await userTable.delete({id});

    return response.status(200).send({message: "Hard delete executado com sucesso!!!"});
})

// Método DELETE pra SOFT DELETE no banco
route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await userTable.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"})

    return response.status(200).send({message: "Usuário excluido com sucesso!!!"})
})

export default route;

