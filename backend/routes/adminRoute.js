const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// router.use(verifyToken);
// router.use(verifyAdmin);

router.put('/users/:id', adminController.updateUser);

router.delete('/users/:id', adminController.deleteUser);

module.exports = router;



//da error al implementarlo dentro de router.put, es el metodo para identificar los permisos de administrador para que
//solo pueda editar/eliminar el admin.
