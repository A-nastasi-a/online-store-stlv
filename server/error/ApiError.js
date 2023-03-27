class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(msg) {
        new ApiError(404, msg);
    }

    static internal(msg) {
        new ApiError(500, msg);
    }

    static forbidden(msg) {
        new ApiError(403, msg);
    }
}

module.exports = ApiError;