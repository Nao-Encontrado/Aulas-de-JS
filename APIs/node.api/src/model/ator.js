import { EntitySchema } from "typeorm";


const ator = new EntitySchema({
    name: "ator",
    tableName: "ator",
    columns: {
        id: { primary: true, type: "int", generated: "increment" },
        nome_ator: { type: "varchar", length: 60, nullable: false },
        sexo: { type: "enum", enum: ["Feminino", "Masculino"], nullable: false },
        data_nasc: { type: "datetime", nullable: false },
        nacionalidade: { type: "varchar", length: 50, nullable: false },
        foto_ator: { type: "varchar", length: 80, nullable: true },
        createdAt: { type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false },
        deletedAt: { type: "datetime", nullable: true }
    }
});

export default ator;