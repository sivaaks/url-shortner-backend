const route= require('express').Router();
const service= require('../services/personalDiary.service');

route.post('/',service.writeDiary);
route.put('/:id',service.editDiary);

module.exports= route;