import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import {upload} from "./middleware/upload.js";
import User from "./model/user.js";
import { v4 as uuidv4 } from 'uuid';
//import minify from "url-minify";
import sharp from "sharp";
const app = express();
// app.use(fileUpload());
// middlewaresConfig(app);
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

let port = process.env.PORT || 3000;

// app.post('/upload', upload.single('file'), async(req,res) => {


//     try{        
//     if(req.file){
//         let file = uploadImage(req.file,uuidv4()).then(async (x) => {
//             const user = await User.create({file: x});

//             if(!user){
//                 throw new Error("something went wrong");
//             }

//             // const short_url = await minify(x,{provider: 'tinyurl.com'});

//             // console.log(short_url);
//             res.status(200).send(user)

//         })
//     }
//     else {
//     console.log("something went wrong");
//     }
       
// }
// catch(err){
//     res.status(400).send(err.message);
// }
// });

app.post('/upload', upload.single('file'), async(req,res) => {

    try{        
    if(req.file){
        const file = await User.create({file: req.file.filename});

        if(!file){
            throw new Error("something went wrong");
        }

        res.status(200).send(file);
}
    }

catch(err){
    res.status(400).send(err.message);
}
});

app.get("/list_files", async(req,res) => {
        try{
    const files = await User.find();
    if(!files){
        throw new Error("something went wrong");
    }

    res.status(200).send(files);
}catch(err){
    res.status(400).send(err.message);
}
});

app.get('/resize', async(req,res) => {
    try {
        
        let query = {};

        query.file = req.query.filename;
        query.width = Number(req.query.width);
        query.height = Number(req.query.height);

        const files = await User.find({file: query.file});

        console.log(files[0].file);
            if(files){
        const edited_file = `./public/img/${uuidv4()}.png`
        let file = `./public/img/${query.file}`;
    
       const resize = await sharp(file).resize(query.width,query.height).png().toFile(edited_file);

         console.log(resize);

        if(!resize){
            throw new Error("something went wrong");
        }

        res.status(200).download(edited_file);
    }
    else {
        throw new Error("something went wrong");
    }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

mongoose.connect("mongodb://localhost/test")
  .then((result) => {
    console.log(
        `Db connected
        Yep this is working 🍺
        App listen on port: ${port} 🍕
      `
    );
    app.listen(port);
  })
  .catch((err) => {
    console.log("Cannot run!", err);
  });
