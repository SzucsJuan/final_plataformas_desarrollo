const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isAdmin} = require('../middleware/roleMiddleware') //da error al implementarlo dentro de router.put, es el metodo para identificar los permisos de administrador para que
                                                        //solo pueda editar/eliminar el admin.

router.use(isAdmin);

router.put('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
