const express = require('express');
const router = express.Router();

const {userController} = require('../controllers');

router.get('/:userId', userController.getUserById);
router.get('/:userId/articles', userController.getUserArticles)
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);


module.exports = router;