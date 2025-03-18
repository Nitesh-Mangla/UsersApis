const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        first_name: {
            type: "varchar",
            name: "first_name",
        },
        last_name: {
            type: "varchar",
            nullable: true,
            name: "last_name",
        },
        email: {
            type: "varchar",
            unique: true,
            name: "email",
        },
        organization: {
            type: "varchar",
            nullable: true,
            name: "organization",
        },
        created_on: {
            type: "date",
            default: () => "CURRENT_TIMESTAMP",
            name: "created_on",
        },
    },
});

module.exports = { User };
