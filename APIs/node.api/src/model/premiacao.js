import { EntitySchema } from "typeorm";


const premiacao = new EntitySchema({
    name: "premiacao",
    tableName: "premiacao",
    columns: {
        id: { primary: true, type: "int", generated: "increment" },
        nome_premiacao: { type: "varchar", length: 60, nullable: false },
        valor_premiacao:{type: "decimal", nullable: true},
        createdAt: { type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false },
        deletedAt: { type: "datetime", nullable: true }
    }
});

export default premiacao;