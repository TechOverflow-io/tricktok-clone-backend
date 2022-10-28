const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authorizations/user.auth')
const roleHelpers = require('../controllers/authorizations/middlewares/user.roles')
const permissionHelpers = require('../controllers/authorizations/middlewares/user.permissions')
const authAccessController = require('../controllers/authorizations/middlewares/user.access')

authRouter.route('/auth/login').post(authController.login);
authRouter.route('/auth/logout').get(authController.logout);
authRouter.route('/auth/roles').get(authController.getUser,roleHelpers.getRoles);
authRouter.route('/auth/permissions').get(authController.getUser,permissionHelpers.getPermissions);

authRouter.route('/auth/admin').get(authController.getUser, authAccessController.isAdmin)
// Assigning & Changing Roles & Permission
authRouter.route('/auth/permission/:id').post(authController.getUser,authAccessController.canEdit,roleHelpers.assignRole)

module.exports = authRouter;