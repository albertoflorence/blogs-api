const { Router } = require('express');
const controller = require('../controllers/blogPost.controller');
const validate = require('../middlewares/blogPost.validate');
const authorization = require('../middlewares/authorization');

const router = Router();

router.post('/', authorization, validate.create, controller.create);
router.get('/', authorization, controller.findAll);

module.exports = router;
