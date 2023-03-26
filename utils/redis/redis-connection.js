const redis = require('redis');

const redisClient = redis.createClient(
  process.env.REDIS_CONNECTION_PORT,
  process.env.REDIS_CONNECTION_HOSTNAME,
);

console.log(process.env.REDIS_CONNECTION_PORT,  process.env.REDIS_CONNECTION_HOSTNAME)

redisClient.on('connect', () => {
  module.exports.client = redisClient;
  console.log(
    `Connected with redis server: host: ${process.env.REDIS_CONNECTION_HOSTNAME} port: ${process.env.REDIS_CONNECTION_PORT}`,
  );
});

redisClient.on('error', (err) => {
  console.log(err);
  console.log('Error while creating connection');
});

module.exports = redisClient;
