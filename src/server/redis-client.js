const Redis = require('ioredis')
const redis = new Redis({
    host: '127.0.0.1',
    port: 16119
});

module.exports = redis
