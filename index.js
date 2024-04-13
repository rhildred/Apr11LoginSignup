const express = require('express');
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const session = require('express-session');
app.use(session({
    secret: "shhhhh",
    resave: false,
    saveUninitialized: true
}))

app.set("views", "views");
app.set("view engine", "ejs");

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
    username: String,
    salt: String,
    password: String
});

app.get("/", (req, res)=>{
    if(req.session.username){
        res.render("index", {username: req.session.username});
    }else{
        res.render("login");
    }
})

app.post("/salt", async(req, res)=>{
    // important to send a salt whether the user exists or not so that we don't leak non-existence of a user
    const user = await User.findOne({username: req.body.username});
    if(user){
        res.send({salt:user.salt});
    }else{
        const salt = uuidv4();
        const user = new User({username:req.body.username, salt});
        await user.save();
        res.send({salt});
    }
    
});

app.post("/loginSignup", async (req, res)=>{
    const user = await User.findOne({username: req.body.username, password: req.body.password});
    if(user){
        // sign in
        req.session.username = req.body.username;
        res.send({success:true});
    }else{
        const user = await User.findOne({username: req.body.username});
        if(user && !user.password){
            // new user
            user.password = req.body.password;
            user.save();
            req.session.username = req.body.username;
            res.send({success:true});
        }
        else{
            res.send({success: false});
        }
    }
});

const server = app.listen(8080, ()=>{
    console.log(`listening on http://localhost:${server.address().port}`);
})