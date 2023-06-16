const userRouter=require("express").Router();
const usermodel=require("../models/User");

userRouter.get("/",async(req,res,next)=>{
   const{}=await req.body
   usermodel.find({ 
  
   }).then(response=>{
    if(response){
       return res.status(200).json({
            success:true,
            message: "done",
          response
          });
    }else{
       return res.status(500).json({
             success:false,
            message: "error",
            response


          }); 
    }
   })
  .catch((error)=>{
    res.status(400).json({
        success:false,
        message: "bad request",
        error:error
      });
  })
})

userRouter.post("/createuser",function (req,res,next){
    const{
        userName,
        userEmail,
        userAddress,
        userPhoneNumber,
        booked_Haal_name,
        Booking_start_date,
        Booking_end_date,
        Advanceamount ,
        
    }=req.body
 
     const newUser=new usermodel( 
        {
            userName,
            userEmail,
            userAddress,
            userPhoneNumber,
            booked_Haal_name,
            Booking_start_date,
            Booking_end_date,
            Advanceamount,
           
        });
        newUser.save().then((response)=>{
            if(response._id){
              return res.status(200).json({ 
                success:true,
                message:"user created successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error creating user",
                    response
                  })
            }
        }).catch((error )=>{
            return res.status(400).json({
                success:false,
                message:"Bad Request",
                error:error
              })
        })

})

userRouter.patch("/updateuser",function (req,res,next){
    const{
        userId,
        userName,
        userEmail,
        userAddress,
        userPhoneNumber,
        booked_Haal_name,
        Booking_start_date,
        Booking_end_date,
        Advanceamount 
    }=req.body
 
      usermodel.updateOne({_id:userId},
        {
            $set:{
            userName,
            userEmail,
            userAddress,
            userPhoneNumber,
            booked_Haal_name,
            Booking_start_date,
            Booking_end_date,
            Advanceamount
            }
        }
        
        )
        .then((response)=>{
            if(response){
              return res.status(200).json({ 
                success:true,
                message:"user update successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error creating user",
                    response
                  })
            }
        }).catch((error )=>{
            return res.status(400).json({
                success:false,
                message:"Bad Request",
                error:error
              })
        })

})

userRouter.get("/search/:userName",async(req,res)=>{
    
    let data=await usermodel.find(
      {
        "$or":[
          {"userName":{$regex:req.params.userName}}
        ]
      }
    )
    res.send(data)
  })













module.exports=userRouter