class RepeatedDatabaseObjects extends Error {
    constructor(errorsArray, ...params) {
        super(...params);
        this.errors = errorsArray;
    }
}
module.exports = RepeatedDatabaseObjects;
