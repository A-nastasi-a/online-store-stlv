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

    async delete(req, res) {
        const { id } = req.params;
        const deleteCookingMethod = await CookingMethod.findOne({where: {id}});
        if (!deleteCookingMethod) {
            return res.status(404).json({message: 'there is no such cooking method'});
        }
        await CookingMethod.destroy({where: {id}});
        return res.json({message: 'cooking method was deleted'});
    }
}

module.exports = new CookingMethodController();