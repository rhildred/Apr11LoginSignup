const express = require('express');
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.post("/salt", async(req, res)=>{
    res.send(`request ${JSON.stringify(req.body)}`);
});
const server = app.listen(8080, ()=>{
    console.log(`listening on http://localhost:${server.address().port}`);
})