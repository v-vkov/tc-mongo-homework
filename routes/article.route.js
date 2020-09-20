const express = require('express');
const router = express.Router();

const {articleController} = require('../controllers');

router.post('/', articleController.createArticle);
router.get('/', articleController.getArticleByFilter);
router.put('/:articleId', articleController.updateArticleById);
router.delete('/:articleId', articleController.deleteArticleById)

module.exports = router;