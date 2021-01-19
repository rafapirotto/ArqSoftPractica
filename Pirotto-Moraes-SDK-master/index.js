const axios = require("axios");

class AddErrorSDK {
    constructor(key) {
        this.key = key;
    }

    async addError(body) {
        const config = {
            headers: { Id: this.key },
            timeout: 500,
        };
        try {
            const error = await axios.post(
                "http://CentinelaGateway-env.eba-p8dbiuud.us-east-1.elasticbeanstalk.com/gateway/errors/",
                body,
                config
            );
            console.log(error);
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = AddErrorSDK;
