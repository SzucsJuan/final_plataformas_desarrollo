const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const recipeController = require('../controllers/recipeController');
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// router.use(verifyToken);
// router.use(verifyAdmin);

router.post('/recetas', recipeController.addRecipe)
router.delete('/recetas/:id', recipeController.deleteRecipe);
router.put('/recetas/:id', recipeController.updateRecipe)
router.get('/recetas', recipeController.getRecetas);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;

