const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const url = `http://localhost:${process.env.PORT}`;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API documentation for User Management",
        },
        servers: [{ url: `http://localhost:${process.env.PORT}` }],
        components: {
            securitySchemes: {
                ApiKeyAuth: {  // ✅ Custom API Key Auth
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",  // ✅ Matches your auth key
                    description: "Auth key is used to get resources (Get auth key from .env file)",
                },
            },
        },
        security: [{ ApiKeyAuth: [] }], // ✅ Global Security
    },
    apis: ["./routes/*.js"], // Path to API route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
