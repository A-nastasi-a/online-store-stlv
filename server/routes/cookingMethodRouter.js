const Router = require('express');
const router = new Router();
const cookingMethodController = require('../controllers/cookingMethodController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), cookingMethodController.create);
router.get('/', cookingMethodController.getAll);
router.delete('/:id', checkRole('ADMIN'), cookingMethodController.delete);

module.exports = router;