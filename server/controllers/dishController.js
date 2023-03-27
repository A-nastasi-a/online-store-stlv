const uuid = require('uuid');
const { Dish, DishInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');

class DishController {
    async create(req, res, next) {
        try {
            const { name, price, typeId, cookingMethodId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            
            if (info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    DishInfo.create({
                        title: i.title,
                        description: i.description,
                        dishId: dish.id
                    })
                )
            }


            const dish = await Dish.create({ name, price, typeId, cookingMethodId, img: fileName });
            return res.json(dish);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { typeId, cookingMethodId, limit, page, info } = req.query;
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

    async getOne(req, res) {
        
        const { id } = req.params;
        
        const dish = await Dish.findOne(
            {
                where: {id}, 
                include: [{model: DishInfo, as: 'info'}]
            },
        )
        return res.json(dish);
    }
    
}

module.exports = new DishController();