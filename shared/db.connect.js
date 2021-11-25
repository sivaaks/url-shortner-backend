const {MongoClient} = require('mongodb');

//const DB_URL= 'mongodb://localhost:27017';
const DB_URL='mongodb+srv://admin:admin@cluster0.icp5l.mongodb.net/diary-manager?retryWrites=true&w=majority'
const DB_NAME='diary-manager';

const client= new MongoClient(DB_URL);

module.exports={
    
    //db names
    db:null,
    users:null,
    events:null,
    contacts:null,
    personalDiary:null,

    //connect to db
    async connect(){
        try{
            client.connect();

            this.db= client.db(DB_NAME);

            this.users= this.db.collection('users');
            this.events= this.db.collection('events');
            this.contacts= this.db.collection('contacts');
            this.personalDiary=this.db.collection('personalDiary');

            console.log('db ready');

        } catch(err){
            console.log(`Error connecting to db ${err}`);
        }
    }

}