const redis = require('redis');

const redisObj = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
}
const client = redis.createClient(redisObj);

class HealthCheckerService {
    constructor() {}

    async checkRedisConnection() {
        try{
            const pingResult = await this.ping(client);
            if(pingResult === "PONG"){
                return "OK";
            }else{
                return "DOWN";
            }
        }catch(err){
            console.log(err);
            throw Error(err);
        }
    }

    async ping(){
        return new Promise((resolve,reject) => {
            client.ping(function(err,res) {
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }

    async check(){
        try{
            let res = {
                "Redis": await this.checkRedisConnection()
            }
            return res;
        }catch(err){
            console.log(err);
            throw Error(err);
        }
    }
}

module.exports = HealthCheckerService;