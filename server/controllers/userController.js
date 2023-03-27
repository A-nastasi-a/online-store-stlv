const ApiError = require('../error/ApiError');

class UserController {
    async registration(req, res) {

    }

    async login(req, res) {
        
    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            res.json('id didn\'t set');
            // return next(ApiError.badRequest('id didn\'t set'));
        }
        res.json(id);
    }
}

module.exports = new UserController();