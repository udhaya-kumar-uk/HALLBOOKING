const mongoose=require("mongoose")

const userschema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
          
        },
        userEmail:{
            type:String,
            required:true,
         
        },
        userAddress:{
            type:String,
            required:true,
            
        },userPhoneNumber:{
            type:String,
            required:true, 
            
        },
        booked_Haal_name:{
            type:String,
            required:true
            
        },
        Booking_start_date:{
            type:String,
            required:false,
            default:null
        },
        Booking_end_date:{
            type:String,
            required:false,
            default:null
        },
        Advanceamount:{
            type:String,
            required:false,
            default:null
        }
    },
)

module.exports=mongoose.model("user",userschema)