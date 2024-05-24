const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('pages'));

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB Connected");
    });

app.get('/', (req, res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
});

app.post("/add", (req, res) =>{
    const category_select = req.body.category_select;
    const amount_input = req.body.amount_input;
    const info = req.body.info;
    const date_input = req.body.date_input;

    const data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    }
    mongoose.connection.collection('users').insertOne(data, (err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    });
});

app.listen(3000);