const mongoose = require('mongoose');
var db = mongoose.connection;

class HealthCheckerService {
    constructor() {}

    async checkMongoConnection() {
        try{
            let status = await db.readyState;
            if(status == 1){
                return "OK";
            }else{
                return "DOWN";
            }
        }catch(err){
            console.log(err);
            throw Error(err);
        }
    }

    async check(){
        try{
            let res = {
                "MongoDB": await this.checkMongoConnection(),
            }
            return res;
        }catch(err){
            console.log(err);
            throw Error(err);
        }
    }
}

module.exports = HealthCheckerService;