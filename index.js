const express= require('express');
const cors=require('cors');
const db= require('./shared/db.connect');

const usersRoute= require('./routes/users.route');
const eventsRoute= require('./routes/events.route');
const contactsRoute= require('./routes/contacts.route');
const personalDiaryRoutes= require('./routes/personalDiary.route');
const dayPlannerRoutes= require('./routes/dayPlanner.route');
const eventsNotifications=require('./services/eventsNotifications');
const {authTokenCheck}=require('./shared/auth');

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
        
        app.listen(process.env.PORT||PORT);

    } catch(err){
        console.log(`Error: ${err}`);
    }
})();

let checkEvents=setInterval(()=>{
    eventsNotifications.sendEventMail();
},1800000);

    // setTimeout(()=>{
    //     clearInterval(checkEvents);
    // },20000)




