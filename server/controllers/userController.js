const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Tray } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'));
        };
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('User with such email already exists'));
        };
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role});
        const tray = await Tray.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json(token);
    }   

    async login(req, res) {
        
    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            // res.json('id didn\'t set');
            return next(ApiError.badRequest('id didn\'t set'));
        }
        res.json(id);
    }
}

module.exports = new UserController();