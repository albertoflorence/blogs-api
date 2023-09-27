const { Router } = require('express');
const controller = require('../controllers/user.controller');
const validate = require('../middlewares/user.validate');

const router = Router();

router.post('/', validate.create, controller.create);

module.exports = router;
