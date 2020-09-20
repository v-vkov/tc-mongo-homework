const {userService} = require('../services')

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    await userService.createUser(user);
    
    return res.sendStatus(201)

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }
 }


 const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = req.body;
    console.log(user);
    await userService.updateUserById(user, userId);
    
    return res.sendStatus(200)

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }

 }

 const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;;
    const user = await userService.getUserById(userId);
    return res.json(user);

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }

 }

 const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;;
    await userService.deleteUserById(userId);
    
    return res.sendStatus(200);

  } catch(err) {
    res.sendStatus(400);
    next(err);

  }
 }

 const getUserArticles = async (req, res, next) => {
  try {
    const userId = req.params.userId;;
    const articles = await userService.getUserArticles(userId);

    if (articles.length < 1 ) {
      throw new Error("User dont have any articles");
    }
    
    return res.json(articles);

  } catch(err) {
    res.json(err);
    next(err);

  }
 }

module.exports = {
  createUser,
  updateUserById,
  getUserById,
  deleteUserById,
  getUserArticles
};