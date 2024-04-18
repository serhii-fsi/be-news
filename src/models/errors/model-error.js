
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
            } else if (code === '23502') {
                // Null value in column "author" of relation "comments" violates not-null constraint
                appError = new AppErrorClass({ code: 400, msg: '400 Bad Request', log: false });
            } else if (code === '23503') {
                // Tnsert or update on table "comments" violates foreign key constraint "comments_article_id_fkey"
                // Key (article_id)=(333) is not present in table "articles"
                appError = new AppErrorClass({ code: 404, msg: '404 Not Found', log: false });
            } else {
                // Unexpected error
                appError = new AppErrorClass({ code: 500, msg: 'Unexpected Error', log: true });
            }
        } else {

        }

        return appError;
    }

    log() {
        const logObj = {
            name: this.name,
            message: this.message,
            stack: this.stack.split("\n    at ")[1],
        };

        const psqlErr = this.getPsqlError();
        
        if (psqlErr) {
            logObj.psql = {};
            psqlErr.code && (logObj.psql.code = psqlErr.code);
            psqlErr.message && (logObj.psql.message = psqlErr.message);
            psqlErr.severity && (logObj.psql.severity = psqlErr.severity);
            psqlErr.table && (logObj.psql.table = psqlErr.table);
            psqlErr.column && (logObj.psql.column = psqlErr.column);
            psqlErr.where && (logObj.psql.where = psqlErr.where);
            psqlErr.detail && (logObj.psql.detail = psqlErr.detail);
            psqlErr.constraint && (logObj.psql.constraint = psqlErr.constraint);
        }

        this.constructor.Logger.logError(logObj);
    }

}


module.exports = ModelError;