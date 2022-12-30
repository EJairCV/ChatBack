const {schema,model, Schema}=require("mongoose");

const userSchema = new Schema({
    email:String,
    password:String,
},{
    timestamps:true
});


module.exports = model("User", userSchema);