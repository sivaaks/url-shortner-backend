const db= require('../shared/db.connect');
const {dateTime,dateOnly,getTokenDetails} = require('../shared/utils');
const {ObjectId} = require('mongodb');

const dayPlanner= {

    async dayPlan(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const data= await db.events.find({date:dateOnly(),userId:_id},{projection:{userId:0}}).sort({time:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log( `Day planner error ${err}`);
        }
    }

}

module.exports= dayPlanner;