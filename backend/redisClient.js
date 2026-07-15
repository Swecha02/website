import Redis from 'ioredis';

export const redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});
