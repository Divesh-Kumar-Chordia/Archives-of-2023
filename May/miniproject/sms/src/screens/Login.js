import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [credentials, setcredentials] = useState({ password: "", USN: "" })
  let navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: credentials.password, USN: credentials.USN })
    })
    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert("Enter valid credentials")
      setcredentials({ ...credentials, ['password']: "" })
    }
    else {
      localStorage.setItem("authToken", json.authToken)
      localStorage.setItem("user",json.user)
      localStorage.setItem("USN",json.USN)
      if (json.user === "admin") {
        console.log("hello boii")
        navigate("/teacher")
      }
      else {
        try {
          const res = await axios(`http://localhost:4000/api/showstudent/${credentials.USN}`)
          console.log(res.data)
          window.sessionStorage.setItem('USN', res.data.USN)
          window.sessionStorage.setItem('name', res.data.name)
          window.sessionStorage.setItem('rno', res.data.rno)
          window.sessionStorage.setItem('status', res.data.status)
          // localStorage.setItem('Token',res.data)
          navigate("/student")
        }
        catch (err) {
          console.log(err)
        }

      }
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ "borderRadius": "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: 'white' }}>Login</p>

                      <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" className="form-control" name='USN' value={credentials.USN} onChange={onChange} />
                            <label className="form-label" htmlFor="usn">Your USN</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>
                        </div>

                        <div className="d-flex  mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Login</button>
                          <Link to='/signup' className="btn btn-primary btn-lg mx-3">Signup</Link>
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
