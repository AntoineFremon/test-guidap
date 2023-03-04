const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT || 'postgres', // By default, the database is in postgres, but it can change someday
        logging: process.env.DATABASE_LOGGING === 'true' ? console.log : null,
    }
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQL connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the SQL database: %s', error);
        // If the connection has an error, we try again after 5 seconds
        // Sometimes with a large database it takes a while for it to be accessible, so we just wait.
        // Ideally here we email an admin who can assess and fix the problem.
        setTimeout(connect, 5000);
    }
};

// Usage of alter is considered risky in prod, so please don't put it in prod's env variables :)
sequelize.sync({ alter: process.env.SQL_ALTER === 'true' });
setTimeout(connect, 5000);

module.exports = sequelize;
