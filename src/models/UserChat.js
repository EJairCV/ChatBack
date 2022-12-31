const {model, Schema}=require("mongoose");

const userSchema = new Schema({
    email:String,
    password:String,
    name:String
},{
    timestamps:true,
    
});


module.exports = model("UserChat", userSchema);