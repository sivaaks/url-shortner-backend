const route= require('express').Router();
const service= require('../services/contacts.service');

route.post('/',service.addContact);
route.put('/:id',service.updateContact);
route.delete('/:id',service.deleteContact);
route.get('/name',service.getContactIdByName);
route.get('/',service.getContacts);
route.get('/names',service.getContactsNameOnly);

module.exports= route;