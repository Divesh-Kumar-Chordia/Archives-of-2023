import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    localStorage.removeItem("USN")
    window.sessionStorage.removeItem("USN")
    window.sessionStorage.removeItem("name")
    window.sessionStorage.removeItem("status")
    window.sessionStorage.removeItem("rno")
    navigate("/login")
 }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">SMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>



            </ul>
            {
              (!localStorage.getItem("authToken")) ? <div class="d-flex">
                <Link className="nav-link" to="/login">Login</Link>

                <Link className="nav-link" to="/signup">Sign Up</Link>
              </div> :
                <div>
                  <div className='btn bg-white text-danger mx-2 ' onClick={handleLogout}>logout</div>
                </div>

            }

          </div>
        </div>
      </nav>
    </div>
  )
}
