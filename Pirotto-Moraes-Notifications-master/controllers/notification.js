const NotificationService = require("../services/notification");
const QueueProducer = require("../queues/queueProducer");

const queueProducer = new QueueProducer();
const notificationService = new NotificationService();

class NotificationController {
    constructor() {}

    async sendEmail(req, res) {
        const email = req.body;
        try {
            await queueProducer.enqueueEmail(email);
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async sendScheduledEmail(req, res) {
        const { email, frequency, severities } = req.body;
        try {
            await queueProducer.enqueuePreference(email, frequency, severities);
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

module.exports = NotificationController;
