const express = require('express');
const app = express();
const http = require('http')
const port = process.env.Port || 3000


app.use("/",require('./routes'))

app.listen(port,()=>{
    console.log(`port running at server ${port}`)
})