require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./src/routes/index.route');

const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
