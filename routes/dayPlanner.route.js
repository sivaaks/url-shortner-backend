const route= require('express').Router();
const service= require('../services/dayPlanner.service');

route.get('/',service.dayPlan);

module.exports= route;