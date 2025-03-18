const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const { userRepository } = require("./repositories/userRepository");
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use('/', userRoutes);
app.use(bodyParser.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.get("/health", async (req, res) => {
            return res.status(200).json({message:"ok"})
        });
    })
    .catch((error) => console.error("Error initializing database", error));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
