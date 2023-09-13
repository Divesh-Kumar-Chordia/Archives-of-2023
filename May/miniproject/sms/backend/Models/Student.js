const mongoose=require('mongoose')
const {Schema}=mongoose

const UserSchema=new Schema({
    rno:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    USN:{
        type:String,
        required:true,
        unique:true
    },
    // email:{
    //     type:String,
    //     required:true
    // }
    attendance:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('student',UserSchema)