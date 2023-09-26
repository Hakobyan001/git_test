// anotherModule.js

import RedisClient from './redis_connect';

const redis = new RedisClient();

// Set a key-value pair
class RedisMethods {
  static async setData(key, value) {
    return redis.set(key, value);
  }

  static async hSetData(key, value) {
    return redis.hset(key, value);
  }

  // Get the value of a key
  static async getData(key) {
    return redis.get(key);
  }

  // Delete the value of a key
  static async deleteData(key) {
    return redis.del(key);
  }
}

export default RedisMethods;
