const express=require('express');
const cors=require('cors')
const mongoose =require('mongoose')
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const multer=require('multer')
const path=require('path')

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors);
app.use(helmet);
app.use(morgan("common"));


// configuration


// mongodb connections
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
console.log(mongoose.connection.readyState);




// storage setup

const storage=multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, "public/images");
    },
    fileName:(req, res, cb)=>{
        cb(null, file.originalname);
    }
})
const upload=multer({storage:storage});

app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("file uploaded")
        
    } catch (error) {
        console.log(error);
        
    }
})



// server

const PORT=process.env.SERVER_PORT||6000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})





