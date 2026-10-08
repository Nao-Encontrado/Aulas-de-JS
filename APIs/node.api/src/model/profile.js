import { EntitySchema } from "typeorm";

const profile = new EntitySchema({
    name: "Profile",
    tableName: "profile",
    columns: {
        id: {primary: true, type: "int", generated: true},
        url_photo_profile: {type: "varchar", nullable: true}
    },
    relations: {
        user: {type: "many-to-one", target: "user", nullable: false}
    },
});

export default profile