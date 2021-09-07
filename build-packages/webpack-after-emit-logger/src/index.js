const logger = require('@scandipwa/scandipwa-dev-utils/logger');

class Logger {
    /**
     * Format: { type: [...logs] }
     */
    constructor() {
        this.logs = [];
    }

    /**
     * These messages get cleared on emit
     * @param {object} message
     */
    logMessage = (message, emitsToLive = 1) => {
        this.logs.push({
            message,
            emitsToLive
        });
    };

    /**
     * Log the logs!
     * Clears logs of type RUNTIME_LOG_TYPE
     */
    emitLogs() {
        const emitLog = ({ type, args }) => logger[type](...args);

        // Display the logs
        // Update the log storage
        setTimeout(() => {
            this.logs = this.logs.reduce((acc, { message, emitsToLive }) => {
                emitLog(message);
                const updatedEmitsToLive = emitsToLive - 1;

                // If needs to be logged during the next compilation - keep it
                if (updatedEmitsToLive > 0) {
                    acc.push({
                        message,
                        emitsToLive: updatedEmitsToLive
                    });
                }

                return acc;
            }, []);
        }, 100);
    }
}

module.exports = new Logger();
