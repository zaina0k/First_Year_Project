const express   = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://Hamza-S:UOMKilburn123@cluster0.rbfj7.mongodb.net/test1",{useNewUrlParser: true}, {useUnifiedTopology: true})



// create scheme 

const namesSchema= {
    name: String,
    age: String,
    country: String
}

const name = mongoose.model("name",namesSchema);

app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/", function(req, res){
    let newName = new name({
        name: req.body.name,
        age: req.body.age

    });
    newName.save();
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("its working");
})