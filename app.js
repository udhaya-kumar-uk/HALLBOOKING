const express=require("express")
const userRouter = require("./controllers/user-controllers")
const HaalsRouter = require("./controllers/haal-controller")
const appserver=express()


// appserver.get("/user",(req,res,next)=>{
//     return res.status(200).json({
//         message:"appserver started "
//     })
// })

appserver.use("/user",userRouter) 
appserver.use("/haals",HaalsRouter)

module.exports=appserver