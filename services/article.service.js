const { Article, User } = require('../models');

const  createArticle = async (item) => {
    try{
        const userId = item.owner;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Owner does not exist!") 
        } 
    
        const article = new Article(item).populate("owner");
        user.numberOfArticles++;
        await article.save();
        await user.save();

    } catch (err) {
        throw err;
    }
} 

const updateArticle = async (data, artId) => {
    try{
        const findQuery = {_id: artId};
        const updatedTime = Date.now();

        const article = await Article.findOne(findQuery); 

        if (article == undefined) {
            throw new Error("Article does not exist!") 
        }

        article.title = data.title;
        article.description = data.description;
        article.updatedAt = updatedTime;
        await article.save();

    } catch (err) {
        throw err;
    }
} 

const getArticleByFilter = async (filter) => {
    try {
        const query = filter ? {} : null;
        if (filter.title) {
            query.title = filter.title;
        }   
        if (filter.subtitle) {
            query.subtitle = filter.subtitle;
        } 
        if (filter.description) {
            // "description": /horse/ - works like %LIKE% in mysql where description LIKE "%horse%"
            query.description = new RegExp(`.*${filter.description}.*`);
        } 
        if (filter.owner) {
            query.owner = filter.owner;
        } 
        if (filter.category) {
            query.category = filter.category;
        } 
        if (filter.createdAt) {
            query.createdAt = filter.createdAt;
        } 
        if (filter.updatedAt) {
            query.updatedAt = filter.updatedAt;
        }

        const articles = query ? await Article.find(query) : await Article.find();

        return articles;
    } catch (err) {
        throw err;
    }
} 

const  deleteArticleById = async (artId) => {
    try{

        const article = await Article.findById(artId);

        if (article == undefined) {
            throw new Error("Owner does not exist!") 
        } 

        const userId = article.owner;
        const user = await User.findById(userId);
        user.numberOfArticles--;

        await Article.deleteOne({_id: artId});
        await user.save();

    } catch (err) {
        throw err;

    }
}  

module.exports = {
    createArticle,
    updateArticle,
    getArticleByFilter,
    deleteArticleById
}