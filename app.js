require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes/index.route');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: " Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./src/routes/*.js"],
};


const specs = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(routes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
