import React from 'react'


export default function Student() {
  const USN = window.sessionStorage.getItem("USN")
  const rno = window.sessionStorage.getItem("rno")
  const name = window.sessionStorage.getItem("name")
  const status = window.sessionStorage.getItem("status")

  return (
    <>

      {/* <p >USN : {USN}</p>
                <p >Roll no : {rno}</p>
                <p >Name : {name}</p>
                <p >Attendance Status : {status}%</p> */}
      <div>
        <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ "borderRadius": "25px" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-normal text-capitalize mb-5 mx-1 mx-md-4 mt-4">Name: {name} </p>



                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <p className="text-center h1 fw-normal mb-5 mx-1 mx-md-4 mt-4">USN : {USN}</p>
                          </div>
                        </div>



                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <p className="text-center h1 fw-normal mb-5 mx-1 mx-md-4 mt-4">Roll no : {rno}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                            <p className="text-center h1 fw-normal mb-5 mx-1 mx-md-4 mt-4">Attendance Status : {status}%</p>
                          </div>
                        </div>


                        <div className="d-flex  mx-4 mb-3 mb-lg-4">

                        </div>



                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>



    </>


  )
}
