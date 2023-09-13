import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Signup() {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",USN:""})
  const [userType,setuserType]=useState();
  const [secretkey,setsecretkey]=useState("");
  const navigate=useNavigate()
  const handlesubmit=async(e)=>{

    if(userType==="admin")
    {
      if(secretkey!=="chinmay")
      {
        e.preventDefault();
        alert("You are not an admin")
      }
      else
      {
        e.preventDefault();
        const response=await fetch("http://localhost:4000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,USN:credentials.USN,userType:userType})
        })
        const json=await response.json()
        console.log(json)
    
        if(!json.success)
            alert("Enter valid credentials") 
        else
            navigate('/teacher')
      }
    }
    else
    {
      e.preventDefault();
      const response=await fetch("http://localhost:4000/api/createuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,USN:credentials.USN,userType:userType})
      })
      const json=await response.json()
      console.log(json)
  
      if(!json.success)
          alert("Enter valid credentials") 
      else
          navigate('/student')
    }

}

const onChange=(event)=>{
     setcredentials({...credentials,[event.target.name]:event.target.value })
}

  return (
    <div>
      <section className="vh-100" style={{"backgroundColor": "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"borderRadius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>

                

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0 ">
                    Register As &nbsp;&nbsp;
                    <input type='radio' name='userType' value='user'  onChange={(e)=>{setuserType(e.target.value)}} /> Student &nbsp;&nbsp;
                    <input type='radio' name='userType' value='admin'  onChange={(e)=>{setuserType(e.target.value)}} /> Teacher &nbsp;&nbsp;

                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                      <label className="form-label" htmlFor="name">Your Name</label>
                    </div>
                  </div>

                  {userType==="admin"?<div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" name='USN' value={credentials.USN} onChange={onChange}/>
                      <label className="form-label" htmlFor="usn">Employee no</label>
                    </div>
                  </div>:<div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" name='USN' value={credentials.USN} onChange={onChange}/>
                      <label className="form-label" htmlFor="usn">Your USN</label>
                    </div>
                  </div>}
                  

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>


                  {userType==="admin"? <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name='secretkey' value={secretkey} onChange={(e)=>{setsecretkey(e.target.value)}}/>
                      <label className="form-label" htmlFor="password">Secret key</label>
                    </div>
                  </div>:null}


                  {/* <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="password">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> */}

                  <div className="d-flex  mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    <Link to='/login' className="btn btn-primary btn-lg mx-3">Already a User</Link>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
