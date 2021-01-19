const UserRepository = require("../dataAccess/user");
const utils = require("../utils");
const axios = require("axios");

const userRepository = new UserRepository();

class UserService {
    constructor() {}

    async getAll(organizationName) {
        return await userRepository.getAll(organizationName);
    }

    async getUserByEmail(email) {
        return await userRepository.getUserByEmail(email);
    }

    async getEmails(organizationName) {
        const users = await userRepository.getAll(organizationName);
        let emails = [];
        users.forEach((user) => {
            emails.push(user.email);
        });
        return emails;
    }

    async getUserById(userId) {
        return await userRepository.getUserById(userId);
    }

    async editUserPreference(user) {
        const { newErrorAssigned } = user.preferences;
        if (!newErrorAssigned.on) {
            newErrorAssigned.frequency = null;
            newErrorAssigned.offset = null;
            newErrorAssigned.severities = [];
        }
        if (newErrorAssigned.frequency)
            this.validateFrequencyRange(newErrorAssigned.frequency);
        this.validateSeverities(newErrorAssigned.severities);
        const modifiedPreference = await userRepository.editUserPreference(
            user
        );
        return modifiedPreference;
    }

    convertTo24Base(number) {
        return number % 24;
    }

    async scheduleByPreferences(modifiedPreference) {
        if(modifiedPreference.preferences.newErrorAssigned.on && modifiedPreference.preferences.newErrorAssigned.frequency > -1){
            const {
                frequency,
                offset,
                severities,
            } = modifiedPreference.preferences.newErrorAssigned;

            const obj = {
                email: modifiedPreference.email,
                frequency: this.convertTo24Base(frequency + offset),
                severities,
            };

            console.log(obj);

            const machineToken = utils.getGeneratedMachineToken(
                process.env.MACHINE_TOKEN
            );
            await axios.post(`${process.env.NOTIFICATIONS_URL}/scheduled`, obj, {
                headers: { MachineToken: machineToken },
            });
        }
    }

    validateFrequencyRange(frequency) {
        // el -1 es valido porque significa que el usuario quiere las notificaciones inmediatamente
        if (frequency < -1 || frequency > 23) {
            throw new RangeError("Frequencia incorrecta.");
        }
    }

    validateSeverities(severities) {
        const allowedValues = [null, 1, 2, 3, 4];
        severities.forEach((severity) => {
            if (!allowedValues.includes(severity))
                throw new RangeError("Valor de severidad incorrecto.");
        });
    }
}

module.exports = UserService;
