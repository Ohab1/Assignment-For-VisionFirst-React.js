
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { AdminFormValidation as NormalUserValidation } from '../FormValidation'
import { useNavigate } from 'react-router-dom'

export default function NormalUserScreen() {

  const [getData, setGetData] = useState([])

  const navigate = useNavigate()




  function getDetails() {
    fetch('http://localhost:3829/CompanyDetails')
      .then((response) => response.json())
      .then((data) => setGetData(data))
  }
  useEffect(() => {
    getDetails()

  }, [])


  const formIntialValues = {
    CompanyName: '',
    CompanyAddress: '',

    CreatedBy: localStorage.getItem('name'),
    Role: 'IT_USER_NORMAL',
    Status: 'UNAPPROVED',

  }
  //   const IntialValues = {
  //     CompanyName: 'This is Set Value CompanyName',
  //    CompanyAddress: 'This is Set Value CompanyAddress',

  //     CreatedBy:localStorage.getItem('name'),
  //     Role: 'IT_ADMIN',
  //     Status:'APPROVED',

  // }

  const formik = useFormik({
    initialValues: formIntialValues,
    validationSchema: NormalUserValidation,


    onSubmit: (values, userValues) => {
      //  console.log(values)
      userValues.resetForm()
      // json-server --watch db.json --port 3829 json start command
      fetch('http://localhost:3829/CompanyDetails', {
        method: 'POST', // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {// console.log('Success:', data);
          alert('Save Sucessfully')
          getDetails()
          // navigate('/login')
        })
        .catch((error) => {
          alert('Internal Server Error')
          alert('If Found Any Please Contact Md Ohab')
          // console.error('Error:', error);
        });
    }
  })


  function Logout() {
    navigate('/login')

    localStorage.removeItem('name')
    // console.log(localStorage.removeItem('name'))
  }









  return (
    <div>



      <nav className="navbar navbar-expand-sm  navbar-light bg-primary">
        <div className="container-fluid ">
          <h4 className="text-light">Welcome to normal user dashboard</h4>

          <div className="d-flex">
            <button type="button" className="btn btn-success  " data-toggle="modal" data-target="#exampleModal" >Create Company</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-danger " onClick={Logout} >Logout</button>
          </div>
        </div>
      </nav>





      <table className="table   mb-0 font bg-light">
        <thead>
          <tr>
            <th scope="col"> Sr. No.</th>
            <th scope="col">Company Name</th>
            <th scope="col">Created By</th>
            <th scope="col">Company Address</th>
            <th scope="col">Status</th>



          </tr>
        </thead>
        {getData.map((CompanyDetails, i) =>

          <tbody key={i}>
            <tr className="bg-light" >
              <td>{CompanyDetails.id}</td>
              <td>{CompanyDetails.CompanyName}</td>
              <td>{CompanyDetails.CreatedBy}</td>
              <td>{CompanyDetails.CompanyAddress}</td>
              <td > {CompanyDetails.Status}</td>


            </tr>
          </tbody>

        )}
      </table>



      <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel"><h5>Registered Here Company Details</h5></div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>





            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-1">

                  <input type="text" onBlur={formik.handleBlur} value={formik.values.CompanyName} onChange={formik.handleChange} className="form-control" placeholder="Please Enter Company Name" name="CompanyName" />
                  {formik.errors.CompanyName && formik.touched.CompanyName ? <span style={{ color: 'red' }}>{formik.errors.CompanyName}</span> : null}
                </div>
                <div className="mb-1">

                  <input type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.CreatedBy} placeholder="Created by" name="CreatedBy" disabled hidden />

                </div>

                <div className="mb-1">

                  <input type="text" onBlur={formik.handleBlur} value={formik.values.CompanyAddress} onChange={formik.handleChange} className="form-control" placeholder=" Please Enter Company Address" name="CompanyAddress" />
                  {formik.errors.CompanyAddress && formik.touched.CompanyAddress ? <span style={{ color: 'red' }}>{formik.errors.CompanyAddress}</span> : null}

                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btno" data-dismiss="modal"  >Cancel</button>
              <button type="button" className="btn btnc" data-dismiss="modal" onClick={formik.handleSubmit} >Save</button>

            </div>
          </div>
        </div>
      </div>
      <footer className="footerr">
        <p>    © 2022 Copyright: Devloped by Md. Ohab</p>
      </footer>
    </div>
  )
}
