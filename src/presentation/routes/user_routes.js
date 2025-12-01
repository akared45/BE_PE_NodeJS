const express = require('express');
const router = express.Router();
const { userController } = require('../../infrastructure/config/dependencies');
const { verifyToken } = require('../middleware/auth_middleware');
const { validateUpdatePatient } = require('../validators/user_validator');

router.use(verifyToken);
router.get('/', userController.getList);
router.get('/:id', userController.getProfile);
router.put('/patients/me', validateUpdatePatient, userController.updatePatientProfile);

module.exports = router;