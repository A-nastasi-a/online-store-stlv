const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({name: name});
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        const { id } = req.params;
        const deleteType = await Type.findOne({where: {id}});
        if (!deleteType) {
            return res.status(404).json({message: 'there is no such type'});
        }
        await Type.destroy({where: {id}});
        return res.json({message: 'type was deleted'});
    }
}

module.exports = new TypeController();