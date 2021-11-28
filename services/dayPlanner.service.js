const db= require('../shared/db.connect');
const {dbDateNow,dbAddDate,getTokenDetails} = require('../shared/utils');
const {ObjectId} = require('mongodb');

const dayPlanner= {

    async dayPlan(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const data= await db.events.find({date:{$gte:new Date(dbDateNow()),$lt:new Date(dbAddDate(1))},userId:_id},{projection:{userId:0}}).sort({date:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log( `Day planner error ${err}`);
        }
    }

}

module.exports= dayPlanner;