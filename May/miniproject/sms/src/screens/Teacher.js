import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Teacher() {
  let navigate=useNavigate()
  return (
   
    <>

      
       <div className="d-flex  mx-4 mb-3 mb-lg-4 " style={{"margin":"20px"}}>

            <Link to='/addstudent' className="btn btn-primary btn-lg mx-3">Add Student</Link>
            <Link to='/takeattendance' className="btn btn-primary btn-lg mx-3">Take Attendance</Link>
            <Link to='/login' className="btn btn-primary btn-lg mx-3">Update Marks</Link>
            <Link to='/addsheet' className="btn btn-primary btn-lg mx-3">Add Sheet</Link>

        </div>
    </>
    
  )
}
