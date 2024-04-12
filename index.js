const express = require('express');
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/demo";
mongoose.connect(mongoDB);
const User = mongoose.model("User",{
    name: String,
    salt: String,
    password: String
});


app.post("/salt", async(req, res)=>{
    const response = await User.findOne({name: req.body.username});
    if(response){
        res.send({salt:response.salt});
    }else{
        const salt = uuidv4();
        const user = new User({username:req.body.username, salt});
        await user.save();
        res.send({salt});
    }
    
});
const server = app.listen(8080, ()=>{
    console.log(`listening on http://localhost:${server.address().port}`);
})