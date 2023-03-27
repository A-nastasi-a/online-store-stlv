const Router = require('express');
const router = new Router();
const dishController = require('../controllers/dishController');

router.post('/', dishController.create);
router.get('/', dishController.getAll);
router.get('/:id', dishController.getOne);

module.exports = router;