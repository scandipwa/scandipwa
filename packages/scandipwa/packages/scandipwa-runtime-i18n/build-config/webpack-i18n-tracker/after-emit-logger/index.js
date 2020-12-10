const logger = require('@scandipwa/scandipwa-dev-utils/logger');

function clearArray(arr) {
    arr.splice(0, A.length);
}

class Logger {
    persistedLogs = [];
    runtimeLogs = [];

    addRuntimeLog(log) {
        this.runtimeLogs.push(log);
    }

    emitLogs() {
        const emitLog = ({ type, args }) => logger[type](...args);

        setTimeout(() => {
            this.persistedLogs.forEach(emitLog);
            this.runtimeLogs.forEach(emitLog);
            clearArray(this.runtimeLogs);
        }, 100);
    }
}

module.exports = new Logger;