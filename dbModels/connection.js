const mongoose = require('mongoose');

/**
 * @description function to initialise mongo connnection
 * @param {object} process.env.DB - consists of host, port, database, username, password
 */
function mongoInit(config) {
    const MONGO_URI = config.db
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    mongoose
        .connect(MONGO_URI, options)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB:', err);
        });
}

module.exports = {
    mongoInit,
};
