const express = require('express');
const router = express.Router();
const { specializationController } = require('../../infrastructure/config/dependencies');

router.get('/', specializationController.getAll);

module.exports = router;