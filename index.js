const express= require('express');
const cors=require('cors');
const db= require('./shared/db.connect');

const usersRoute= require('./routes/users.route');
const urlsRoute= require('./routes/urls.route');
const infoRoutes=require('./routes/info.route');
const {authTokenCheck}=require('./shared/auth');

const app= express();
const PORT=3001;

(async()=>{
    try{
        await db.connect();

        app.use(cors({
            origin:['http://localhost:3000','http://reus.ml','https://reus.ml']
        }))
        app.use(express.json());

        app.use(authTokenCheck);
        
        app.use('/users',usersRoute);
        app.use('/urls',urlsRoute);
        app.use('/info',infoRoutes);
        
        app.listen(process.env.PORT||PORT);

    } catch(err){
        console.log(`Error: ${err}`);
    }
})();




