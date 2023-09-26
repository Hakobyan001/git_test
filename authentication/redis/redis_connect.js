import Redis from 'ioredis';

class RedisClient {
  constructor() {
    this.client = new Redis({
      host: 'redis', // Use the container name as the host
      port: 6379, // Redis default port
      // password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
    });
  }

  set(key, value) {
    return this.client.set(key, value);
  }

  hset(key, value) {
    return this.client.hset(key, value);
  }

  get(key) {
    return this.client.get(key);
  }

  del(key) {
    return this.client.del(key);
  }

  incr(key) {
    return this.client.incr(key);
  }

  close() {
    this.client.quit();
  }
}

export default RedisClient;
