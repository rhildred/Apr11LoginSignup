const express = require('express');
const app = express();
app.use(express.static("public"));
const server = app.listen(8080, ()=>{
    console.log(`listening on http://localhost:${server.address().port}`);
})