const mongoose=require("mongoose")

const Haalschema=new mongoose.Schema(
    {
        HaalName:{
            type:String,
            required:true,                  
           
        },
        HaalAddress:{
            type:String,
            required:true,
            
        },
        HaalAmenities:{
            type:Array,
            required:true,
        
        },
        HaalPhoneNumber:{
            type:String,
            required:true,
            
        },
     
        RoomsAvailable:{
            type:String,
        },
        seatsAvailable:{
            type:String
        },
        Rentperhour:{
            type:String
        },
        isBooked:{
            type:Boolean
        },
        userId:{
            type:mongoose.Schema.ObjectId
        }
        
    },

)

module.exports=mongoose.model("Haal",Haalschema)