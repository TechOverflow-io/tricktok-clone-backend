const express = require('express');
const userController = require('../controllers/user.controller')
const userRouter = express.Router();
const userAuth = require('../controllers/authorizations/user.auth')
const authAccessController = require('../controllers/authorizations/middlewares/user.access')

userRouter.route('/adduser').post(userAuth.getUser, authAccessController.canAdd, userController.createUser)
// userRouter.route('/adduser').post(userAuth.getUser,authController.canAdd)

userRouter.route('/user/editprofile').patch(userAuth.getUser, userController.editProfile)
// userRouter.route('/user/all').get(userAuth.getUser,authAccessController.canView,userController.getAllUsers)
userRouter.route('/user/all').get(userController.getAllUsers)

userRouter.route('/user/:id').get(userAuth.getUser, authAccessController.canView, userController.getUser).patch(userAuth.getUser, authAccessController.canEdit, userController.updateUser).delete(userAuth.getUser, authAccessController.canDelete, userController.deleteUser)

module.exports = userRouter