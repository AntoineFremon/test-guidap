const express = require('express');
const cors = require('cors');

require('./config/sqlConnection');

const app = express();

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type', 'Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

// TODO morgan
// TODO error management
const router = require('./routes');

app.use('/', router);

app.listen(8000, () => console.log('Running on http://localhost:8000'));
