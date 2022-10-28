const express = require('express');
const contactController =require('../../controllers/contacts/contacts.controller')
const contactRouter=express.Router();

contactRouter.route('/contact/add').post(contactController.createContact);
contactRouter.route('/contact/all').get(contactController.getAllContacts);
contactRouter.route('/contact/:id').patch(contactController.updateContact).delete(contactController.deleteContact);

module.exports = contactRouter;