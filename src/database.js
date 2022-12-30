

const mongoose = require ("mongoose");
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1/angular-auth")
    .then(db=>console.log("database is connected"))
    .catch(err=>console.log(err));

