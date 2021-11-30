const db= require('../shared/db.connect');
const {dbDateNow,dbAddDate,getTokenDetails} = require('../shared/utils');
const {ObjectId} = require('mongodb');

const dayPlanner= {

    async dayPlan(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        const dateGiven=new Date(req.query.date);
        const dateAfterOneDay=new Date(req.query.date);
        dateAfterOneDay.setDate(dateGiven.getDate()+1);
        try{
            const data= await db.events.find({dateTime:{$gte:new Date(`${dbDateNow(dateGiven)}T00:00:01.000Z`),$lt:new Date(`${dbDateNow(dateAfterOneDay)}T00:00:00.000Z`)},userId:_id},{projection:{userId:0}}).sort({dateTime:1}).toArray();
            //const data= await db.events.find({dateTime:{$gte:dateGiven,$lt:dateAfterOneDay},userId:_id},{projection:{userId:0}}).sort({dateTime:1}).toArray();
            //const data= await db.events.find({dateTime:{$gte:new Date(dbDateNow(dateGiven)),$lt:new Date(dbAddDate(dateGiven,1))},userId:_id},{projection:{userId:0}}).sort({dateTime:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log( `Day planner error ${err}`);
        }
    }

}

module.exports= dayPlanner;