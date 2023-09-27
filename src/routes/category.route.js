const { Router } = require('express');
const controller = require('../controllers/category.controller');
const validate = require('../middlewares/category.validate');
const authorization = require('../middlewares/authorization');

const router = Router();

router.post('/', authorization, validate.create, controller.create);
router.get('/', authorization, controller.findAll);

module.exports = router;
