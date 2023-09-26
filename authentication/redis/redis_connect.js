import Redis from 'ioredis';

// Create a Redis client
const redis = new Redis({
  host: 'redis', // Use the container name as the host
  port: 6379, // Redis default port
  password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
});

// Set a key-value pair
redis.set('myKey', 'Hello, Redis!');

// Get the value of a key
redis.get('myKey')
  .then((result) => {
    console.log('Value of myKey: wowww!!', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Increment a key
redis.incr('counter')
  .then((result) => {
    console.log('Counter: wowww!!@@222', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Close the Redis connection when done
redis.quit();
