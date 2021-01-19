const Queue = require("bull");
const e = require("express");

const redisConfig = {
    redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
};

const emailsQueue = new Queue("emails", redisConfig);
const preferencesQueue = new Queue("preferences", redisConfig);

class QueueProducer {
    constructor() {}

    async enqueueEmail(email) {
        try {
            await emailsQueue.add(email, {removeOncomplete: true});
        } catch (error) {
            console.log(error);
            return error;
        }
        console.log("encola email");
    }

    async enqueuePreference(email, frequency, severties) {
        try {
            const cronExpresion = "0 " + frequency + " * * *";
            let obj = {
                email: email,
                severties: severties,
            };
            console.log("La frecuencia es: " + frequency);
            await preferencesQueue.add(obj, {repeat: {cron: cronExpresion}});
        } catch (error) {
            console.log(error);
            return error;
        }
        console.log("encola preferencia");
    }
}

module.exports = QueueProducer;
