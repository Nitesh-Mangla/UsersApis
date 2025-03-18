require("reflect-metadata");
const { DataSource } = require("typeorm");
require('dotenv').config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/entities/*.js"],
    synchronize: false,
});

module.exports = { AppDataSource };
