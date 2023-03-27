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
        const { typeId, cookingMethodId } = req.query;
        let dishes; 
        if ( !typeId && !cookingMethodId ) {
            dishes = await Dish.findAll();
        }
        if ( typeId && !cookingMethodId ) {
            dishes = await Dish.findAll({where: {typeId}});
        }
        if ( !typeId && cookingMethodId ) {
            dishes = await Dish.findAll({where: {cookingMethodId}});
        }
        if ( typeId && cookingMethodId ) {
            dishes = await Dish.findAll({where: {typeId, cookingMethodId}});
        }
        return res.json(dishes);
    }

    async getOne(req, res) {}
}

module.exports = new DishController();