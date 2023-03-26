const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const user = require('./routers/user');
const post = require('./routers/post');
const todo = require('./routers/todo');
const {
    errorResponse,
    statusCodes: { STATUS_CODE_FAILURE, STATUS_CODE_DATA_NOT_FOUND },
} = require('./utils/response/response.handler');
const { logger } = require('./utils/logs/logger');

const DEFAULT_PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());


const { initConfig } = require('./config');

initConfig()
    .then((config) => {
        const { allowCrossDomain } = require('./middlewares/cors/cors.middleware');
        const { mongoInit } = require('./dbModels/connection');

        // gzip, deflate compression of API response to reduce data transfer over internet
        app.use(compression());

        // enable CORS - Cross Origin Resource Sharing
        app.use(allowCrossDomain);

        app.use('/user', user);
        app.use('/post', post);
        app.use('/todo', todo);
        app.use((req, res) => errorResponse({
            code: STATUS_CODE_DATA_NOT_FOUND,
            req,
            res,
            message: 'Route not found',
        }));

        app.use((error, req, res) => errorResponse({
            code: STATUS_CODE_FAILURE,
            req,
            res,
            error,
            message: error.message,
        }));

        app.set('port', process.env.PORT || DEFAULT_PORT);

        const server = app.listen(app.get('port'), async () => {
            mongoInit({ db: process.env.DB, logger });
            logger.info(`Express server listening on port ${server.address().port}`);
        });
    })
    .catch((err) => {
        console.log('Failed to fetch config', err);
    });
module.exports = app;
