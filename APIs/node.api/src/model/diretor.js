import { EntitySchema } from "typeorm";


const diretor = new EntitySchema({
    name: "diretor",
    tableName: "diretor",
    columns: {
        id: { primary: true, type: "int", generated: "increment" },
        nome_diretor: { type: "varchar", length: 60, nullable: false },
        sexo: { type: "enum", enum: ["Feminino", "Masculino"], nullable: false },
        data_nasc: { type: "datetime", nullable: true },
        nacionalidade: { type: "varchar", length: 50, nullable: false },
        foto_diretor: { type: "varchar", length: 80, nullable: true },
        createdAt: { type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false },
        deletedAt: { type: "datetime", nullable: true }
    }
});

export default diretor;