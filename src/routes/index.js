const routes = require("express").Router();
 
routes.get("/",(req,res,next)=>{
    res.send("McNeill Chimuka")
})

module.exports = routes