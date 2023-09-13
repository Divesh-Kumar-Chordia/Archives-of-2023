const express=require('express')
const Student=require('../Models/Student')
const router=express.Router();
const User=require('../Models/User')
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret="studentmonitoringsystem"

const multer = require('multer');
const xlsx = require('xlsx');



router.post('/createuser',[body('email','Please enter valid email').isEmail(),body('password','min len of password is 5').isLength({min:5})],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const salt=await bcrypt.genSalt(10);
    let secPass=await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
           name:req.body.name,
           USN:req.body.USN,
           email:req.body.email,
           password:secPass,
           userType:req.body.userType,
          
        })
        

        res.json({success:true}) 
   } catch (error) {
       console.log(error)
       res.json({success:false})
   }
})

router.post('/loginuser',async(req,res)=>{
    
   let USN=req.body.USN;
   console.log(USN);
    try {
        let userdata=await User.findOne({USN});
        if(!userdata)
            return res.status(400).json({errors:"Tryy logging in with correct credentials"})

        const pwdCompare=await bcrypt.compare(req.body.password,userdata.password);

        if(!pwdCompare)
        return res.status(400).json({errors:"Try logging in with correct password"})
    
        const data={
            user:{
                id:userdata.id
            }
        }

        const authToken=jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken,user:userdata.userType,USN:userdata.USN})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})

router.post('/addstudent',async(req,res)=>{

    try {
        await Student.create({
           name:req.body.name,
           USN:req.body.USN,
           rno:req.body.rno,
           
        })  
        res.json({success:true}) 
   } catch (error) {
       console.log(error)
       res.json({success:false})
   }
})

router.get('/takeattendance',async(req,res)=>{

    const response=await Student.find().sort({rno:1});
    //console.log(response);
     res.json(response)
})


router.get('/showstudent/:id',async(req,res)=>{
    const id=req.params.id
    console.log(id)
    response=await Student.findOne({USN:id});
    console.log(response)
    res.json(response)
})

router.post('/incrattendance',async(req,res)=>{
    
    console.log(req.body.rno)
    try{
        response=await Student.updateOne({rno:req.body.rno},{$inc:{attendance:req.body.hrs}});
        
       // console.log(response)
        res.json(response)
    }
    catch(err){
        console.log(err)
    }

//    const rno=req.body.rno;
//    Student.findOne({rno}).then(std=>{
//     const atd=Number(std.attendance)+1
//    return std.updateOne({rno:rno},{$set:{attendance:atd}})
//    }).then((data)=>{
//          console.log(data)
//         return data
//    }).catch(err=>{
//     console.log(err)
//    })
    
})

router.post('/decrattendance',async(req,res)=>{
    
    console.log(req.body.rno)
    try{
        response=await Student.updateOne({rno:req.body.rno},{$inc:{attendance:-req.body.hrs}});
        
       // console.log(response)
        res.json(response)
    }
    catch(err){
        console.log(err)
    }
    
})

router.post('/doneattendance',async(req,res)=>{
    
    console.log(req.body.USN)
    try{
        console.log("done updating atd for user")
        response=await User.updateOne({USN:req.body.USN},{$inc:{attendance:req.body.hrs}});
        
        // console.log(response)
        res.json(response)
    }
    catch(err){
        console.log("errro in done attendance")
        console.log(err)
    }
    
})

router.post('/attendancestatus',async(req,res)=>{
    
    console.log("hi")
    try {
        //Retrieve the teacher document
        console.log("hello")
        const USN=req.body.USN
        console.log(`Attendance Status ${USN}`)
        const teacher = await User.findOne({USN:USN});
    
        if (!teacher) {
          throw new Error('Teacher not found');
        }
    
        const totalHoursTaken = teacher.attendance;
    
        const students = await Student.find();
    
        students.forEach(async (student) => {
          const attendancePercentage = (student.attendance / totalHoursTaken) * 100;
    
          student.status = attendancePercentage;
    
          await student.save();
        });
    
        console.log('Attendance updated for all students');
      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    
    
})




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addsheet', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.read(file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const students = data
      .slice(1)
      .map(row => ({
        rno: Number(row[0]),
        USN: row[1],
        name: row[2],
        attendance:row[3],
      }))
    //   .filter(student => student.rollNumber && student.usn && student.name);

    await Student.insertMany(students);

    res.status(200).send('Data uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading data.');
  }
});

router.post('/addmarks', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const workbook = xlsx.read(file.buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
      const students = data
        .slice(1)
        .map(row => ({
          rno: Number(row[0]),
          USN: row[1],
          name: row[2],
          attendance:row[3],
        }))
      //   .filter(student => student.rollNumber && student.usn && student.name);
  
      await Student.insertMany(students);
  
      res.status(200).send('Data uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading data.');
    }
  });



module.exports=router

