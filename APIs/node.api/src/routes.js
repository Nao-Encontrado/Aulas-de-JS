import express from "express"
import userController from "./controllers/UserController.js"
import AtorController from "./controllers/AtorController.js"
import DiretorController from "./controllers/DiretorController.js"
import GeneroController from "./controllers/GeneroController.js"
import PremiacaoController from "./controllers/PremiacaoController.js"
import route from "./controllers/LoginController.js"
import uploadController from "./controllers/fotoController.js";
import { authenticate } from "./utils/jwt.js";

const routes = express();

//Importação de rotas
routes.use("/user", userController);
routes.use("/upload", authenticate, uploadController);
routes.use("/ator", AtorController);
routes.use("/diretor", DiretorController);
routes.use("/genero", GeneroController);
routes.use("/premiacao", PremiacaoController);
routes.use("/login", route);


export default routes;