import redis from "redis";
//const redis = require('redis');
const redis_client = redis.createClient({
    socket: {
        host: 'host.docker.internal',
        port: '6379'
    }
});

redis_client.on('error', err => {
    console.log('Error ' + err);
});

await redis_client.connect();
//export default redis_client;
//console.log(redis_client);

export default redis_client;