const express= require('express');
const cors=require('cors');
const db= require('./shared/db.connect');

const usersRoute= require('./routes/users.route');
const eventsRoute= require('./routes/events.route');
const contactsRoute= require('./routes/contacts.route');
const personalDiaryRoutes= require('./routes/personalDiary.route');
const dayPlannerRoutes= require('./routes/dayPlanner.route');
const infoRoutes=require('./routes/info.route');
const eventsNotifications=require('./services/eventsNotifications');
const updateEventStatus=require('./services/updateEventStatus');
const {authTokenCheck}=require('./shared/auth');

const {dbAddTime}=require('./shared/utils');

const app= express();
const PORT=3001;

(async()=>{
    try{
        await db.connect();

        app.use(cors({
            origin:['http://localhost:3000','https://siva-diary-manager.netlify.app']
        }))
        app.use(express.json());

        app.use(authTokenCheck);
        
        app.use('/users',usersRoute);
        app.use('/events',eventsRoute);
        app.use('/contacts',contactsRoute);
        app.use('/personal-diary',personalDiaryRoutes);
        app.use('/day-planner',dayPlannerRoutes);
        app.use('/info',infoRoutes);
        
        app.listen(process.env.PORT||PORT);

    } catch(err){
        console.log(`Error: ${err}`);
    }
})();

let checkEvents=setInterval(()=>{
    eventsNotifications.sendEventMail();
},1800000);

const updateEventStatusInterval=()=>{

}

setInterval(()=>{
    updateEventStatus.checkAndUpdateEvent();
},60000)






    // setTimeout(()=>{
    //     clearInterval(checkEvents);
    // },20000)




