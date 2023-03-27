const Router = require('express');
const router = new Router();
const cookingMethodController = require('../controllers/cookingMethodController');

router.post('/', cookingMethodController.create);
router.get('/', cookingMethodController.getAll);

module.exports = router;