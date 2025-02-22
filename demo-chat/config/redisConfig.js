const redisAdapter = require('socket.io-redis');

/**
 * Configures Redis for the given Socket.IO instance.
 * 
 * @param {Object} io - The Socket.IO server instance.
 * @param {Function} io.adapter - The adapter function to use for Redis.
 * @param {Object} io.of - The namespace function to use for Redis.
 * @param {Object} io.of('/').adapter - The adapter instance for the root namespace.
 * @param {Object} io.of('/').adapter.pubClient - The Redis publish client.
 * @param {Object} io.of('/').adapter.subClient - The Redis subscribe client.
 * 
 * @example
 * const io = require('socket.io')(server);
 * configureRedis(io);
 * 
 * @description
 * This function sets up a Redis adapter for a Socket.IO server instance, allowing
 * for scaling across multiple nodes. It connects to a Redis server using the host
 * and port specified in the environment variables `REDIS_HOST` and `REDIS_PORT`,
 * or defaults to `127.0.0.1` and `6379` respectively. It also sets up event listeners
 * for various Redis adapter events such as `error`, `connect`, `disconnect`, `reconnect`,
 * and `ready`, and logs the status of the Redis publish and subscribe clients.
 */

module.exports = configureRedis;
const configureRedis = (io) => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;

  console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);
  io.adapter(redisAdapter({ host: redisHost, port: redisPort }));

  io.of('/').adapter.on('error', (err) => {
    console.error('Redis connection error:', err);
    process.exit(1);
  });

  io.of('/').adapter.on('connect', () => {
    console.log('Connected to Redis');
  });

  io.of('/').adapter.on('disconnect', () => {
    console.log('Disconnected from Redis');
  });

  io.of('/').adapter.on('reconnect', () => {
    console.log('Reconnected to Redis');
  });

  io.of('/').adapter.on('ready', () => {
    console.log('Redis adapter is ready');
  });

  // Add detailed logging for Redis adapter status
  const pubClient = io.of('/').adapter.pubClient;
  const subClient = io.of('/').adapter.subClient;

  pubClient.on('ready', () => {
    console.log('Redis pubClient is ready');
  });

  subClient.on('ready', () => {
    console.log('Redis subClient is ready');
  });

  pubClient.on('error', (err) => {
    console.error('Redis pubClient error:', err);
  });

  subClient.on('error', (err) => {
    console.error('Redis subClient error:', err);
  });
};

module.exports = configureRedis;