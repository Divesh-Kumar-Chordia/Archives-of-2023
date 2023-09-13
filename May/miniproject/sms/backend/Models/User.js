const mongoose=require('mongoose')
const {Schema}=mongoose

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    USN:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now
    },
    attendance:{
        type:Number,
        default:0
    }

})

module.exports=mongoose.model('user',UserSchema)