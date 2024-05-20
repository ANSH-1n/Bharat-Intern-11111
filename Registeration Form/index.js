const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const user = require("./models/user");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB CONNECTED")
    })

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        const existingUser = await user.findOne({email : email});
        
        if(!existingUser){
            const newUser = new user({
                username,
                email,
                password
            });
            newUser.save();
            res.redirect("/success");
        }else{
            res.redirect("/error");
        }
        
    }catch (error){
        res.redirect("/error");
    }
});

app.get("/success", (req,res)=>{
    res.sendFile(__dirname + "/pages/success.html")
});

app.get("/error", (req,res)=>{
    res.sendFile(__dirname + "/pages/error.html")
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})