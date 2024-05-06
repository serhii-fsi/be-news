class Logger {
    static startLogging() {
        this.constructor.logging = true;
    }

    static stopLogging() {
        this.constructor.logging = false;
    }

    static log(msg) {
        if (this.constructor.logging !== true) return;
        console.log(msg);
    }

    static logError(error) {
        if (this.constructor.logging !== true) return;
        console.log(error);
    }
}

module.exports = Logger;
