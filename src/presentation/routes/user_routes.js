const express = require('express');
const router = express.Router();
const { userController } = require('../../infrastructure/config/dependencies_2');
const { verifyToken } = require('../middleware/auth_middleware');

router.use(verifyToken);
router.get('/:id', userController.getProfile);

module.exports = router;