const { Router } = require('express');
const controller = require('../controllers/user.controller');
const validate = require('../middlewares/user.validate');
const authorization = require('../middlewares/authorization');

const router = Router();

router.post('/', validate.create, controller.create);
router.get('/', authorization, controller.findAll);
router.get('/:id', authorization, controller.findOne);
router.delete('/me', authorization, controller.deleteOne);

module.exports = router;
