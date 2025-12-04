const express = require('express');
const router = express.Router();
const { doctorController } = require('../../infrastructure/config/dependencies_2');

router.get('/', doctorController.getList);
router.get('/:id', doctorController.getDetail);

module.exports = router;