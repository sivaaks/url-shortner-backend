const route= require('express').Router();
const service= require('../services/personalDiary.service');

route.post('/',service.writeDiary);
route.put('/:id',service.editDiary);
route.get('/',service.getDiary);

module.exports= route;