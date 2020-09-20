const {User, Article} = require('../models');

const  createUser = async (user) => {
    try{
        const u = await User.create(user);
        console.log('wha');
        console.log(u);
        return u;
    } catch (err) {
        throw err;
    }
} 

const updateUserById = async (data, userId) => {
    try{
        const findQuery = {_id: userId};
        const updateQuery = {$set: { firstName: data.firstName, lastName: data.lastName }}
        await User.updateOne(findQuery, updateQuery);
    } catch (err) {
        throw err;
    }
} 

const getUserById = async (userId) => {
    try{
        const user = await User.findOne({_id: userId});
        return user;
    } catch (err) {
        throw err;
    }
} 

const deleteUserById = async (userId) => {
    try{
        await User.deleteOne({_id: userId})
    } catch (err) {
        throw err;
    }
} 


const getUserArticles = async (userId) => {
    try{

        const articles = await Article.find({owner: userId});

        return articles;

    } catch (err) {
        throw err;
        return err;
    }
} 

module.exports = {
    createUser,
    updateUserById,
    getUserById, 
    deleteUserById,
    getUserArticles
}