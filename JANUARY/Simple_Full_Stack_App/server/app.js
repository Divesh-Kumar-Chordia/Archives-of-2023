const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService.js');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//dbService

//create
app.post('/insert',(request,response) => {

});
//read
app.get('/getAll',(request,response) => {
    const db = dbService.getDbServiceInstance();
    const result =db.getAllData();
    //the response<from dbService>
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

//update

//listen
app.use((req,res)=>{
    res.status(404).send('Route not found');
});

app.listen(process.env.PORT,()=>{
    console.log(`https://localhost:${process.env.PORT}`);
});

