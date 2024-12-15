const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/comentarios', commentController.addComment);

module.exports = router;