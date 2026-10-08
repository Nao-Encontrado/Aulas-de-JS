import express, { request, response } from 'express';
import { AppDataSource } from '../database/config.js';
import user from '../model/user.js';
import { IsNull } from 'typeorm';
import { generateNewPassword } from '../utils/login.js';
import { sendEmail } from '../helpers/nodemailer.js';
import { generateToken} from "../utils/jwt.js";

const route = express.Router();
const userTable = AppDataSource.getRepository(user);

route.post("/", async (request, response) => {
    const { email, password } = request.body;
    const userExist = await userTable.findOneBy({email, password, deletedAt: IsNull()});
    const token = generateToken({user: user.name, email: user.email, typeUser: user.typeUser});
    if (userExist) {
        return response.status(200).send({message: "Login realizado com sucesso!", token})
    }
    else {
        return response.status(401).send({message: "Email ou senha incorretos!"})
    }
})

route.put("/reset", async (request, response) => {
    const { email } = request.body;
    const userExist = await userTable.findOneBy({email, deletedAt: IsNull()});
    if (!userExist) {
        return response.status(404).send({"response": "Email não encontrado!"});
    }
    const newPassword = generateNewPassword();

    await userTable.update({email}, {password: newPassword});
    console.log(userExist.email)
    sendEmail(newPassword, userExist.email);
    return response.status(200).send({"response": "Senha enviada para o email cadastrado!"});
    });

export default route;