const { CookingMethod } = require('../models/models');
const ApiError = require('../error/ApiError');

class CookingMethodController {
    async create(req, res) {
        const { name } = req.body;
        const cookingMethod = await CookingMethod.create({ name });
        return res.json(cookingMethod);
    }

    async getAll(req, res) {
        const cookingMethods = await CookingMethod.findAll();
        return res.json(cookingMethods);
    }
}

module.exports = new CookingMethodController();