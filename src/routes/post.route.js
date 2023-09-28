const { Router } = require('express');
const controller = require('../controllers/blogPost.controller');
const validate = require('../middlewares/blogPost.validate');
const authorization = require('../middlewares/authorization');

const router = Router();

router.post('/', authorization, validate.create, controller.create);
router.get('/', authorization, controller.findAll);
router.get('/:id', authorization, controller.findOne);
router.put('/:id', authorization, validate.update, controller.update);
router.delete('/:id', authorization, controller.deleteOne);

module.exports = router;
