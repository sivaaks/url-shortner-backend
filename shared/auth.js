const jwt= require('jsonwebtoken');
const urlPattern=require('url-pattern');

const verifyPattern=new urlPattern('/users/verify(/:token)');
const resetPattern=new urlPattern('/users/reset-password(/:token)');
const originalPattern=new urlPattern('/urls(/:shortend)');

const services={

    authTokenCheck(req,res,next){
        console.log(req.path);
        if(req.path=='/users/login' || req.path=='/users/register' || req.path=='/users/forgot-password' || verifyPattern.match(req.path)|| resetPattern.match(req.path) || originalPattern.match(req.path)) return next();
        const loggedUser= jwt.decode(req.headers.auth);
        //console.log(loggedUser);
        //console.log(Date.now(),loggedUser.exp*1000);
        if(!loggedUser) return res.status(401).send('Login to continue');
        //Check token expiry
       // console.log(Date.now(),loggedUser.exp*1000);
        if(Date.now()>=loggedUser.exp*1000) return res.status(401).send('Login to continue');
        next();
        return loggedUser;
    },

    getLoggedInUser:{},

}

module.exports=services;