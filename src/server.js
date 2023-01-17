const express = require('express');
const app = express();
const http = require('http');
const bodyParser =require('body-parser')
const mongoDb = require('../src/db/connect')
const port = process.env.Port || 8080

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


//app.listen(port,()=>{
    //console.log(`port running at server ${port}`)
//})
mongoDb.initDb((err, mongoDb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });