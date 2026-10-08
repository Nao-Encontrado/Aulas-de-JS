import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    database: "projeto_API",
    password: "BewareTheWater",
    entities: ["src/model/*.js"],
    migrations: ["src/database/migration/*.cjs"]
})

export { AppDataSource }