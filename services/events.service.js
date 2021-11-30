const db=require('../shared/db.connect');
const {addEvent,deleteEvent,updateEvent,getEventsByType}=require('../shared/validation');
const {dateTime,getTokenDetails} = require('../shared/utils');
const {ObjectId}= require('mongodb');

const events={

    async addEvent(req,res){

        try{
            //validate data
            const {error,value}= addEvent.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            //check if any event exists in the same date and time
            const event= await db.events.find({dateTime:value.dateTime,userId:_id}).toArray();
            if(event.length>0) return res.status(200).send('An event already exists in the same date and time');
            else {
               const data= await db.events.insertOne({...value,dateTime:new Date(value.dateTime),duration:new Date(value.duration),createdAt:dateTime,userId:_id});
               return res.status(200).send(data);
            }
        }catch(err){
            console.log(`Add event error ${err}`);
        }
    },

    async deleteEvent(req,res){
        try{
            const {error,value}= deleteEvent.validate({id:req.params.id});
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.events.deleteOne({_id:ObjectId(value.id),userId:_id});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },

   async updateEvent(req,res){
        try{
            const id= req.params.id;
            const {error,value}= updateEvent.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.events.findOneAndUpdate({_id:ObjectId(id),userId:_id},{$set:{...value,dateTime:new Date(value.dateTime)}});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Error updating ${err}`);
        }
    },

    async getEvents(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const events= await db.events.find({userId:_id}).toArray();
            return res.status(200).send(events);
        }catch(err){ 
            console.log(`Error getting events ${err}`);
        }
    },

    async getEventById(req,res){
        const id=req.params.id;
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        console.log(id);
        try{
            const events= await db.events.findOne({_id:ObjectId(id),userId:_id},{_id:0,userId:0});
            console.log('events',events);
            return res.status(200).send(events);
        }catch(err){ 
            console.log(`Error getting events ${err}`);
        }
    },

   async getEventsByType(req,res){
        try{
            const {error,value}= getEventsByType.validate({type:req.params.type});
            if(error) return res.status(400).send({
                error:'Validation error',
                message:error.details[0].message,
                })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.events.find({type:value.type,userId:_id}).sort({dateTime:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get events by type error: ${err}`);
        }
    },

    async getEventsByMonth(req,res){
        try{
            // const {error,value}= getEventsByType.validate({type:req.params.type});
            // if(error) return res.status(400).send({
            //     error:'Validation error',
            //     message:error.details[0].message,
            //     })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.events.find({userId:_id}).sort({dateTime:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get events by type error: ${err}`);
        }
    },

    async statusUpdate(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const data=await db.events.findOneAndUpdate({_id:ObjectId(req.query.id),userId:_id},{$set:{status:req.query.status}});
            console.log(data.lastErrorObject.updatedExisting);
            return res.status(200).send('Updated event status');
        }catch(err){
            console.log(`Error updating event status ${err}`);
        }
    }

}

module.exports= events;