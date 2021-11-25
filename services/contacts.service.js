const db= require('../shared/db.connect');
const {ObjectId}= require('mongodb');
const {contacts,contactName} = require('../shared/validation');
const {getTokenDetails}=require('../shared/utils');

const contactServices= {

   async addContact(req,res){
        try{
            const {error,value}= contacts.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation error',
                message:error.details[0].message,
            })
            const {user:{_id}}=getTokenDetails(req.headers.auth);
            const {name,email,phone}= value;
            const contact = await db.contacts.findOne({$or:[{name},{email},{phone}],userId:_id});
            if(contact) return res.status(400).send('Contact already exists');
            const data= await db.contacts.insertOne({...value,userId:_id});
            return res.status(200).send('Contact created');
        }catch(err){
            console.log(`Error adding ${err}`);
        }
    },

    async deleteContact(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const id= req.params.id;
            const data= await db.contacts.deleteOne({_id:ObjectId(id),userId:_id});
            return res.status(200).send(data);
        }catch(err){
            console.log(`Error deleting contact ${err}`);
        }
    },

    async updateContact(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const {error,value}= contacts.validate(req.body);
            if(error) return res.status(400).send({
                error:'Va;idation failed',
                message:error.details[0].message,
            })
            const id= req.params.id;
            const {name,email,phone}= value;
            const isExists = await db.contacts.findOne({$or:[{name},{email},{phone}],userId:_id});
            if(isExists._id!=id) return res.status(400).send('Contact already exists');
            const data= await db.contacts.findOneAndUpdate({_id:ObjectId(id),userId:_id},{$set:value},{returnNewDocument:true});
            return res.status(200).send(data);
        } catch(err){
            console.log(`Error updating contact ${err}`);
        }
    },

    async getContacts(req,res){
        const {user:{_id,email}}=getTokenDetails(req.headers.auth);
        try{
            const data= await db.contacts.find({userId:_id},{projection:{name:1,email:1,phone:1}}).toArray();
            res.status(200).send(data);
        }catch(err){
            console.log(`Error getting contacts ${err}`);
        }
    },

    async getContactIdByName(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const {error,value}= contactName.validate(req.body);
            if(error) return res.status(400).send({
                error:'Validation error',
                message:error.details[0].message,
            })
            const data= await db.contacts.findOne({name:value.name,userId:_id},{projection:{_id:1}});
            res.status(200).send(data);
        }catch(err){
            console.log(`Error getting contact name by id : ${err}`);
        }
    },

    async getContactsNameOnly(req,res){
        const {user:{_id}}=getTokenDetails(req.headers.auth);
        try{
            const data= await db.contacts.find({userId:_id},{projection:{_id:0,name:1}}).toArray();
            return res.status(200).send(data);
        }catch(err){
            console.log(`Error gettings contacts name only ${err}`);
        }
    }
    

}

module.exports= contactServices;
