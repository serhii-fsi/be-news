
class AppError extends Error {

    static Logger;
    #code;
    #msg;

    constructor(config = {}) {
        const msg = config.msg ?? 'Server Error';
        super(msg);
        this.setCode(config.code ?? 500);
        this.setMsg(msg);
        if(config.log ?? true) this.log();
    }

    static setLogger(Logger) {
        this.Logger = Logger;
    }

    setCode(code) {
        this.#code = code;
    }

    getCode() {
        return this.#code;
    }

    getHttpStatusCode() {
        // For now this App has the same status codes as http status codes 
        // but it is different entities and we could use not only http transport
        return this.getCode();
    }

    setMsg(msg) {
        this.#msg = msg;
    }

    getMsg() {
        return this.#msg;
    }

    log() {
        this.constructor.Logger.logError(this);
    }

    exportForClient() {
        // Here we should export this error for client
        // Avoid including sensitive information that could help to an attacker
        return { error: { status: this.#code, msg: this.#msg } };
    }

}


module.exports = AppError;