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

app.post("/salt", async(req, res)=>{
    res.send({salt:uuidv4()});
});
const server = app.listen(8080, ()=>{
    console.log(`listening on http://localhost:${server.address().port}`);
})