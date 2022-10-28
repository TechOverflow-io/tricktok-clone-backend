const express = require('express');
const routeController = require('../controllers/role.controller')
const userAuth = require("../controllers/authorizations/user.auth");
const authAccessController = require("../controllers/authorizations/middlewares/user.access");
const roleRouter = express.Router();

roleRouter.route('/addrole').post(userAuth.getUser,authAccessController.canAdd,routeController.createRole)
roleRouter.route('/allroles').get(userAuth.getUser,authAccessController.canView,routeController.allRoles)
roleRouter.route('/role/:id').patch(userAuth.getUser,authAccessController.canEdit,routeController.updateRole)
    .delete(userAuth.getUser,authAccessController.canDelete,routeController.deleteRole)

// Status Change
roleRouter.route('/role/change/:id').patch(routeController.changePermissionStatus)

module.exports = roleRouter