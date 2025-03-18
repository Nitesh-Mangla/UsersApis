require("reflect-metadata");
const { DataSource } = require("typeorm");
const { faker } = require("@faker-js/faker");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "user_services",
    entities: [__dirname + "/entities/*.js"],
    synchronize: false,
});

module.exports = { AppDataSource };
