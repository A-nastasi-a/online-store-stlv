const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Tray = sequelize.define('tray', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const TrayDish = sequelize.define('tray_dish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Dish = sequelize.define('dish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0.0},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const CookingMethod = sequelize.define('cooking_method', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.FLOAT, allowNull: false}
});

const DishInfo = sequelize.define('dish_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

const TypeCM = sequelize.define('type_cm', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

User.hasOne(Tray);
Tray.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Tray.hasMany(TrayDish);
TrayDish.belongsTo(Tray);

TrayDish.hasOne(Dish);
Dish.belongsTo(TrayDish);

Dish.hasMany(DishInfo, {as: 'info'});
DishInfo.belongsTo(Dish);

Dish.hasMany(Rating);
Rating.belongsTo(Dish);

Type.hasMany(Dish);
Dish.belongsTo(Type);

CookingMethod.hasMany(Dish);
Dish.belongsTo(CookingMethod);

Type.belongsToMany(CookingMethod, {through: TypeCM});
CookingMethod.belongsToMany(Type, {through: TypeCM});

module.exports = {
    User, 
    Tray,
    TrayDish,
    Dish,
    Type, 
    CookingMethod,
    Rating,
    DishInfo,
    TypeCM
}