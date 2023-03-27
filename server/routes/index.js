const Router = require('express');
const router = new Router();
const dishRouter = require('./dishRouter');
const userRouter = require('./userRouter');
const cookingMethodRouter = require('./cookingMethodRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/cook_method', cookingMethodRouter);
router.use('/dish', dishRouter);

module.exports = router;