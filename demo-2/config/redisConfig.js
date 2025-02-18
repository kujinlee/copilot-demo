const redisAdapter = require('socket.io-redis');

const configureRedis = (io) => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;

  io.adapter(redisAdapter({ host: redisHost, port: redisPort }));

  io.of('/').adapter.on('error', (err) => {
    console.error('Redis connection error:', err);
    process.exit(1);
  });
};

module.exports = configureRedis;
