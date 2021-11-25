const {dateOnly,timeOnly,convertTimeTo12H,addTime,loggedInUserInfo}=require('../shared/utils');
const db=require('../shared/db.connect');
const sendMail=require('../shared/sendMail');
const {ObjectId}=require('mongodb');

const eventNotifications={

    async sendEventMail(){

        const timeInterval='0.30';
        const timeNotify=addTime(timeOnly(),timeInterval);
        console.log(timeOnly(),timeNotify,dateOnly());
        try{
           const events=await db.events.find({$and:[{date:dateOnly()},{time:{$gte:parseFloat(timeOnly()),$lt:parseFloat(timeNotify)}}]}).sort({time:1}).toArray();
            events.forEach(async (event)=>{
                const usersInfo=await db.users.findOne({_id:ObjectId(event.userId)});
                console.log(usersInfo);
                sendMail(usersInfo.email,'Upcoming schedule','',`
                    <h2>Your upcoming next scheudule</h2> <br/>
                    <h4>Name: ${event.name}</h4><br/>
                    <h4>Date: ${event.date}</h4><br/>
                    <h4>Time: ${convertTimeTo12H(event.time)}</h4><br/>
                    <h4>Description: ${event.description}</h4><br/>
                `)
            })
        }catch(err){console.log(`Error send mail events ${err}`)};
    }
}

module.exports= eventNotifications;
