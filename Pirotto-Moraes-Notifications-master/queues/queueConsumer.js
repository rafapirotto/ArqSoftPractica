const axios = require("axios");
const utils = require("../utils");
const Queue = require("bull");
const NotificationService = require("../services/notification");

const redisConfig = {
    redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
};

const emailsQueue = new Queue("emails", redisConfig);
const preferencesQueue = new Queue("preferences", redisConfig);

const notificationService = new NotificationService();

class QueueConsumer {
    constructor() {}

    process() {
        preferencesQueue.process(async (job) => {
            console.log("Desencola preferencesQueue");
            const emailBody = await this.getErrorsEmailBody(job.data.email, job.data.severties);
            if(emailBody){
                await notificationService.sendEmail(emailBody);
            }
            done();
        });
        
        emailsQueue.process(async (job) => {
            console.log("Desencola emailsQueue");
            await notificationService.sendEmail(job.data);
            done();
        });

    }

    async getErrorsEmailBody(email, severities){
        const machineToken = utils.getGeneratedMachineToken(
            process.env.MACHINE_TOKEN
        );
        const { data: errors } = await axios.post(
            `${process.env.ERRORS_URL}/assignedToday/${email}`, {severities: severities},
            {
                headers: { MachineToken: machineToken },
            }
        );

        let esVacia = true;
        let content = "Hoy se le asignaron los siguientes errores:\n\n";
        errors.forEach(async (error) => {
            esVacia = false;
            let severity = error.severity;
            if(!severity){
                severity = "Sin severidad"
            }
            content += "Titulo: " + error.title 
            + "\nDescripcion: " + error.description 
            + "\nSeveridad: " + severity + "\n\n";
        });
        let emailObj = {
            to: email,
            subject: "Errores asignados hoy",
            content: content,
        };

        if(!esVacia){
            return emailObj;
        }else{
            return null;
        }
    }

}
module.exports = QueueConsumer;
