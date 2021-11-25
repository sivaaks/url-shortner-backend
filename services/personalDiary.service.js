const db= require('../shared/db.connect');
const {ObjectId} = require('mongodb');
const {dateTime,dateOnly,getTokenDetails} = require('../shared/utils');
const {personalDiary}= require('../shared/validation');

const personalDiaryServices={

    async writeDiary(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const {error,value}= personalDiary.validate(req.body);
            if(error) return res.status(400).send({
                error: 'Validation failed',
                message:error.details[0].message,
            })
            //Check todays date and diary date
            if(value.date!==dateOnly()) return res.status(400).send(`This diary content with date : ${value.date} cannot be posted on ${dateOnly()}. Diary content can be modified and added only on the current date`);
            //Check if diary exists in the given date
            const isExists = await db.personalDiary.findOne({date:value.date,userId:_id});
            if(isExists) return res.status(400).send('Personal diary already written in the given date');
            const data= await db.personalDiary.insertOne({...value,createdAt:dateTime,userId:_id});
            return res.status(200).send(data); 
        }catch(err){
            console.log(`Error writing peronal diary ${err}`);
        }
    },

   async editDiary(req,res){
    const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const id= req.params.id;
            const {error,value}= personalDiary.validate(req.body);
            if(error) return res.status(400).send(error.details[0].message);
            if(id.length<24) return res.status(400).send('Invalid ID');
            const data= await db.personalDiary.findOne({_id:ObjectId(id),userId:_id},{projection:{date:1}});
            if(data.date!==dateOnly()) return res.status(403).send('This diary content cannot be edited now as the day has passed by')
            const updatedDiary= await db.personalDiary.findOneAndUpdate({_id:ObjectId(id),userId:_id},{$set:{content:value.content}});
            return res.status(200).send(updatedDiary);
        }catch(err){
            console.log(`Edit diary error ${err}`);
        }
    }

}

module.exports= personalDiaryServices;