const {articleService} = require('../services')

const createArticle = async (req, res, next) => {
  try {
    const item = req.body;
    await articleService.createArticle(item);
    
    return res.sendStatus(201)

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }
 }


 const updateArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = req.body;

    const err = await articleService.updateArticle(article, articleId);
    
    if (err) {
        throw new Error(err);
    }

    return res.sendStatus(200)

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }
 }

 const getArticleByFilter = async (req, res, next) => {
  try {

    const filter = req.body;
    const article = await articleService.getArticleByFilter(filter);

    return res.json(article);

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }

 }

 const deleteArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;;
    await articleService.deleteArticleById(articleId);
    
    return res.sendStatus(200);

    } catch(err) {
        res.sendStatus(400);
        next(err);
    }
 }


module.exports = {
  createArticle,
  updateArticleById,
  getArticleByFilter,
  deleteArticleById
}