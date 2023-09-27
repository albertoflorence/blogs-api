const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/auth.validate');

const router = Router();

router.post('/login', validate.login, controller.login);

module.exports = router;
