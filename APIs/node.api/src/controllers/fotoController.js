import express from 'express';
import User from '../model/user.js';
import Upload from "../model/profile.js"
import { AppDataSource } from '../database/config.js';
import { IsNull } from 'typeorm';
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs';

const route = express.Router();
const userRepository = AppDataSource.getRepository(User);
const uploadRepository = AppDataSource.getRepository(Upload);

const upload = multer({ dest: './src/uploads/' });

route.post("/", upload.single("uploads"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({error: "Imagem não enviada"})
        }
    const user = await userRepository.findOneBy({
        email: req.user.email,
        deletadAt: IsNull()
    });
    if (!user) {
        return res.status(401).send({"response": "Falha no upload. Refaça seu login"});
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const urlUpload = result.secure.url

    const profile = uploadRepository.create({user_photo_profile: urlUpload, user });
    await uploadRepository.save(profile);

    fs.unlinkSync(req.file.path);
    res.send({ "response": "Imagem salva com sucesso", urlUpload });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erro ao salvar a imagem"});
    }
})

export default route;