const {dbAddTime,dateOnly,timeOnly,convertTimeTo12H,addTime,loggedInUserInfo}=require('../shared/utils');
const db=require('../shared/db.connect');
const sendMail=require('../shared/sendMail');
const {ObjectId}=require('mongodb');

const updateEventStatus={

    async checkAndUpdateEvent(){

        console.log('Date on update event: ',new Date());

        try{
           const events=await db.events.updateMany({dateTime:{$lte:new Date()},status:'Scheduled'},{$set:{status:'In progress'}});
           //const events=await db.events.findAnd({$and:[{date:dateOnly()},{time:{$gte:parseFloat(timeOnly()),$lt:parseFloat(timeNotify)}}]}).sort({time:1}).toArray();
           console.log(events);
        }catch(err){console.log(`Error updating Ln 15 events ${err}`)};
    }
}

module.exports= updateEventStatus;
