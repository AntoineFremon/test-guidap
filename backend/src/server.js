const express = require('express');
const cors = require('cors');

const routing = require('./middlewares/routing');

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

app.use((err, req, res, next) => {
    if (err.resSent) {
        // It's not actually an error, just an object passed to overwrite middlewares
        // So we pass it along without touching it
        return next(err);
    }

    const status = err.status || 500;
    console.log(err);
    routing.sendResponse(status, req, res, next, err);
});

app.use((finalObject, req, res, next) => {
    if (finalObject.resSent) {
        // Here we can put anything we want after each API call, such as analytics or final actions.
    }
});

app.listen(8000, () => console.log('Running on http://localhost:8000'));
