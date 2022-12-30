const express = require("express");
const app = express();
const cors = require("cors");


//base de datos mongo
require("./database");

//config express



app.use(cors());
app.use(express.json());
app.use("/api",require("./routes/rutasUser"));


//config socket
 const http = require("http").Server(app);
 const io = require("socket.io")(http,{
    
     cors:{
         origin:true,
         credentials:true,
         methods:["GET","POST"],
        
     }
 });





//eventos socket
io.on("connection",(socket)=>{
    socket.on("cliente-mensaje",(mensaje)=>{
        console.log(mensaje.text)
        socket.broadcast.emit("servidor-mensaje",mensaje)
    })
    console.log("nuevo usuario conectado")
})




http.listen(3000,()=>{
    console.log("server socket on")
})

// // app.listen(3000);

