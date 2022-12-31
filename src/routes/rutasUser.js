const {Router} =require ("express");
const router= Router();

const User= require("../models/UserChat");

const jwt = require ("jsonwebtoken");

const verifyToken = (req,res, next)=>{
    console.log(req.headers.authorization);

    if(!req.headers.authorization){
        return res.status(401).send("Unauthorize request");
    }

    const token = req.headers.authorization.split(" ")[1];

    if(token ==="null"){
        return res.status(401).send("Unathorize request");
    }
    //poner la secretkey en una variable de entorno
    const payload = jwt.verify(token, "secretkey");

    req.userId=payload._id;
    next();
}

router.get("/",(req,res)=>res.send("hello world"));

router.post("/registro",async (req,res)=>{   
    const {email, password, name} = req.body;    
    const newUser = new User({
        email,
        password,
        name
    });
    await newUser.save();

    const token =jwt.sign({_id: newUser._id},"secretkey")

    res.status(200).json({token,name});
})


router.post("/log",async (req,res)=>{
    const {email,password} =req.body;

    const user = await User.findOne({email})
    if(!user) return res.status(200).send("el correo no existe");
    if(user.password!==password) return res.status(401).send("contraseña no valida");

    const token = jwt.sign({_id:user._id},"secretkey");
    console.log(user.name);
    return res.status(200).json({token, name:user.name});
});

router.get("/task", async(req,res)=>{
    res.json([
        {
            _id:1,
            name: "task one",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:2,
            name: "task 2",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:3,
            name: "task 3",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:4,
            name: "task 4",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        }
    ]);
});


router.get("/private-task",verifyToken, (req,res)=>{

    res.json([
        {
            _id:1,
            name: "task one",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:2,
            name: "task 2",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:3,
            name: "task 3",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        },{
            _id:4,
            name: "task 4",
            description: "lorem asfasdasd",
            date: "2019-11-17T20:39:05.211Z"
        }
    ]);
})





module.exports =router;

