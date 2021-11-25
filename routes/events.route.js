const route = require('express').Router();
const service= require('../services/events.service');

route.post('/',service.addEvent);
route.delete('/:id',service.deleteEvent);
route.put('/:id',service.updateEvent);
route.get('/',service.getEvents);
route.get('/:id',service.getEventById);
route.get('/type/:type',service.getEventsByType);
route.patch('/status',service.statusUpdate);

module.exports= route;
