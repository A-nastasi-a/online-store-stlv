const uuid = require('uuid');
const { Dish } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');

class DishController {
    async create(req, res, next) {
        try {
            const { name, price, typeId, cookingMethodId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            
            const dish = await Dish.create({ name, price, typeId, cookingMethodId, img: fileName });
            return res.json(dish);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { typeId, cookingMethodId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let dishes; 
        if ( !typeId && !cookingMethodId ) {
            dishes = await Dish.findAndCountAll({ limit, offset });
        }
        if ( typeId && !cookingMethodId ) {
            dishes = await Dish.findAndCountAll({where: {typeId}, limit, offset});
        }
        if ( !typeId && cookingMethodId ) {
            dishes = await Dish.findAndCountAll({where: {cookingMethodId}, limit, offset});
        }
        if ( typeId && cookingMethodId ) {
            dishes = await Dish.findAndCountAll({where: {typeId, cookingMethodId}, limit, offset});
        }
        return res.json(dishes);
    }

    async getOne(req, res) {}
}

module.exports = new DishController();