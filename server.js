const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const { userRepository } = require("./repositories/userRepository");
const userRoutes = require('./routes/user');
const { swaggerSpec, swaggerUi } =  require('./swagger')
require('dotenv').config();

const app = express();
app.use(cors());
app.use('/', userRoutes);
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.get("/health", async (req, res) => {
            return res.status(200).json({message:"ok"})
        });
    })
    .catch((error) => console.error("Error initializing database", error));

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});
