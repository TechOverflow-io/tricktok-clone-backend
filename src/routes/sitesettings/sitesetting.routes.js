const express = require('express')
const siteController = require('../../controllers/sitesettings/site.setting.controller')
const userAuth = require('../../controllers/authorizations/user.auth')
const authAccessController = require('../../controllers/authorizations/middlewares/user.access')
const site_router = express.Router()
// to Add logo Allow only admin and also checking anyone is login or not
site_router.route('/addlogo').post(userAuth.getUser, authAccessController.canAdd, siteController.addLogo)
// to Update logo Allow only admin and also checking anyone is login or not
site_router.route('/updatelogo/:id').patch(userAuth.getUser, authAccessController.canAdd, siteController.updateLogo)
module.exports = site_router