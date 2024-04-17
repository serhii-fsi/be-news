
class ModelError extends Error {

    static Logger;
    static AppError;
    #code;
    #msg;
    #psqlError;

    constructor(config = {}) {
        const msg = config.msg ?? 'Model Error';
        super(msg);
        this.setCode(config.code ?? 500);
        this.setMsg(msg);
        this.setPsqlError(config.psql);
        if (config.log ?? true) this.log();
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
        const AppErrorClass = this.constructor.AppError;
        let appError;
        const psqlError = this.getPsqlError();

        if (psqlError) {
            const code = psqlError.code;
            if (code === '22P02') {
                // Invalid input syntax for type integer: "not_a_digit"
                appError = new AppErrorClass({ code: 400, msg: '400 Bad Request', log: false });
            } else {
                // Unexpected error
                appError = new AppErrorClass({ code: 500, msg: 'Unexpected Error', log: true });
            }
        } else {

        }

        return appError;
    }

    log() {
        this.constructor.Logger.logError(this);
        this.constructor.Logger.logError(this.getPsqlError());
    }

}


module.exports = ModelError;