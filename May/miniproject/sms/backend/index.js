const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Student=require('./Models/Student')

const dburi='mongodb+srv://chinmay:chinmay@cluster0.vbl1st6.mongodb.net/sms?retryWrites=true&w=majority'

mongoose.connect(dburi,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(4000,()=>{
        console.log("Server is ready")
    })
})
.catch((err)=>{
    console.log("unable to connect to the database")
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json())
app.use('/api',require('./Routes/UserAuth'))

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/takeattendance', function(req, res) {
    Student.find({}, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  });