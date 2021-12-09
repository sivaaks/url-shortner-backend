const route = require('express').Router();
const service= require('../services/urls.service');

route.post('/',service.addURL);
route.delete('/:id',service.deleteURL);
route.get('/',service.getURL);
route.get('/:shortend',service.getOriginal);
//route.put('/:id',service.updateEvent);
//route.get('/:id',service.getEventById);
//route.get('/type/:type',service.getEventsByType);
//route.get('/calendar/all',service.getEventsByMonth);
//route.patch('/status',service.statusUpdate);

module.exports= route;
