const HaalsRouter=require("express").Router()
 const HaalsModel=require("../models/Haals")

 HaalsRouter.get("/",async(req,res,next)=>{
  const{}=await req.body
  HaalsModel.find({
    
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



 HaalsRouter.get("/all",async(req,res,next)=>{
    const{}=await req.body
    HaalsModel.aggregate([
      {
      $match:{isBooked:true},
      },
      
      {
        $project:{
          _id:0, 
          HaalName:1, 
          HaalAmenities:1, 
          RoomsAvailable:1, 
          seatsAvailable:1,  
          isBooked:1,
          userId:1
        }
      }  ,
      {
        $lookup:{
          from:'users',
          localField:"userId",
          foreignField:"_id",
          as:"userdetails" 
           
        }
      },
      {
        $sort:{
          RoomsAvailable:1
          }
      },

      
    ])

    .then(response=>{
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

 //Booked Haal Details and Booking user name

 HaalsRouter.get("/name",async(req,res,next)=>{
  const{}=await req.body
  HaalsModel.find({
    isBooked:true
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



HaalsRouter.post("/createhaals",function (req,res,next){
    const{
        HaalName,
        HaalAddress, 
        HaalAmenities,
        HaalPhoneNumber, 
        RoomsAvailable, 
        seatsAvailable, 
        Rentperhour, 
        isBooked,
        userId
       
    }=req.body
 
     const newHaal=new HaalsModel( 
        {
            HaalName,
            HaalAddress, 
            HaalAmenities,
            HaalPhoneNumber, 
            RoomsAvailable, 
            seatsAvailable, 
            Rentperhour, 
            isBooked,
            userId
        });
        newHaal.save().then((response)=>{
            if(response._id){
              return res.status(200).json({
                success:true,
                message:"Haal created successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error creating Haal",
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


HaalsRouter.get("/get/:HaalName",async(req,res)=>{
    
    let data=await HaalsModel.find(
      {
        "$or":[
          {"HaalName":{$regex:req.params.HaalName}}
        ]
      }
    )
    res.send(data)
  })


module.exports=HaalsRouter