
class ModelError extends Error {

    static Logger;
    static AppError;
    #code;
    #msg;
    #psqlError;

    constructor(config = {}) {
        const msg = config.msg ?? 'Server Error';
        super(msg);
        this.setCode(config.code ?? 500);
        this.setMsg(msg);
        this.setPsqlError(config.psql);
        if (isLogging) this.log();
    }

    static setLogger(Logger) {
        this.Logger = Logger;
    }

    static setAppError(AppError) {
        this.AppError = AppError;
    }

    setCode(code) {
        this.#code = code;
    }

    getCode() {
        return this.#code;
    }

    setMsg(msg) {
        this.#msg = msg;
    }

    getMsg() {
        return this.#msg;
    }

    setPsqlError(psqlError) {
        this.#psqlError = psqlError;
    }

    getPsqlError() {
        return this.#psqlError;
    }

    toAppError() {
        // Place for converting ModelError to AppError
        const appError = new this.constructor.AppError({log: false});
        appError.setCode(500);
        return appError;
    }

    log() {
        this.constructor.Logger.logError(this);
        this.constructor.Logger.logError(this.getPsqlError());
    }

}


module.exports = ModelError;