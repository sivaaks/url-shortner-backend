const db=require('../shared/db.connect');
const {addURL,deleteURL,updateEvent}=require('../shared/validation');
const {dateTime,getTokenDetails,randomString} = require('../shared/utils');
const {ObjectId}= require('mongodb');

const urls={

    async addURL(req,res){

        try{
            //validate data
            const {error,value}= addURL.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const urls= await db.urls.find({original:value.original,userId:_id}).toArray();
            if(urls.length>0) return res.status(200).send('This URL is already shortend');
            const shortend=randomString();
            console.log('shortend string',shortend);
            const random= await db.urls.findOne({shortend:shortend});
            if(random) return res.status(400).send('Something went wrong. Please try again later');
            const data= await db.urls.insertOne({...value,shortend:shortend,hits:0,createdAt:dateTime,userId:_id});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Add url error ${err}`);
        }
    },

    async deleteURL(req,res){
        try{
            const {error,value}= deleteURL.validate({id:req.params.id});
            if(error) return res.status(400).send({
                error:'Validation failed',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.urls.deleteOne({_id:ObjectId(value.id),userId:_id});
            res.status(200).send(data);
        }catch(err){
            console.log(err);
        }
    },

   
   async getURL(req,res){
        try{
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const data= await db.urls.find({userId:_id}).sort({createdAt:1}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Get URL error: ${err}`);
        }
    },

    async getOriginal(req,res){
        console.log(req.params);
        try{
            const data= await db.urls.findOne({shortend:req.params.shortend});
            console.log(data);
            urls.updateCount(data.shortend);
            return res.status(200).send(data.original);
        }catch(err){
            console.log(`Get Original URL error: ${err}`);
        }
    },

    async updateCount(shortend){
        try{
            const data= await db.urls.update({shortend:shortend},{$inc:{hits:1}});
            console.log('update count',data);
        }catch(err){
            console.log(`Update count error: ${err}`);
        }
    },

    // async updateEvent(req,res){
    //     try{
    //         const id= req.params.id;
    //         const {error,value}= updateEvent.validate(req.body);
    //         if(error) return res.status(400).send({
    //             error:'Validation failed',
    //             message:error.details[0].message,
    //         })
    //         const {user:{_id}}=getTokenDetails(req.headers.auth);
    //         const data= await db.events.findOneAndUpdate({_id:ObjectId(id),userId:_id},{$set:{...value,dateTime:new Date(value.dateTime)}});
    //         return res.status(200).send(data);
    //     }catch(err){
    //         console.log(`Error updating ${err}`);
    //     }
    // },

    // async getEvents(req,res){
    //     const {user:{_id}}=getTokenDetails(req.headers.auth);
    //     try{
    //         const events= await db.events.find({userId:_id}).toArray();
    //         return res.status(200).send(events);
    //     }catch(err){ 
    //         console.log(`Error getting events ${err}`);
    //     }
    // },

    // async getEventById(req,res){
    //     const id=req.params.id;
    //     const {user:{_id}}=getTokenDetails(req.headers.auth);
    //     console.log(id);
    //     try{
    //         const events= await db.events.findOne({_id:ObjectId(id),userId:_id},{_id:0,userId:0});
    //         console.log('events',events);
    //         return res.status(200).send(events);
    //     }catch(err){ 
    //         console.log(`Error getting events ${err}`);
    //     }
    // },


    // async getEventsByMonth(req,res){
    //     try{
    //         // const {error,value}= getEventsByType.validate({type:req.params.type});
    //         // if(error) return res.status(400).send({
    //         //     error:'Validation error',
    //         //     message:error.details[0].message,
    //         //     })
    //         const {user:{_id}}=getTokenDetails(req.headers.auth);
    //         const data= await db.events.find({userId:_id}).sort({dateTime:1}).toArray();
    //         return res.status(200).send(data);
    //     }catch(err){
    //         console.log(`Get events by type error: ${err}`);
    //     }
    // },

    // async statusUpdate(req,res){
    //     const {user:{_id}}=getTokenDetails(req.headers.auth);
    //     try{
    //         const data=await db.events.findOneAndUpdate({_id:ObjectId(req.query.id),userId:_id},{$set:{status:req.query.status}});
    //         console.log(data.lastErrorObject.updatedExisting);
    //         return res.status(200).send('Updated event status');
    //     }catch(err){
    //         console.log(`Error updating event status ${err}`);
    //     }
    // }

}

module.exports= urls;