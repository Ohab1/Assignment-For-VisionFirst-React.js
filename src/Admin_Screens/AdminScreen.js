import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { AdminFormValidation } from '../FormValidation'
import { useNavigate } from 'react-router-dom'
export default function AdminScreen() {
  const [hide, setHide] = useState(false)
  const [hidebtn, setHidebtn] = useState(false)
  const [getData, setGetData] = useState([])
  const [updateDetail, setUpdateDetail] = useState(null)
  const [search, setSearch] = useState('')
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
    Role: 'IT_ADMIN',
    Status: 'APPROVED',

  }


  const formik = useFormik({
    initialValues: formIntialValues,
    validationSchema: AdminFormValidation,


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
          console.error('Error:', error);
        });
    }
  })

  function DeleteUser(CompanyDetails) {
    // alert(id)
    fetch(`http://localhost:3829/CompanyDetails/${CompanyDetails.id}`, {
      method: 'DELETE'
    }).then((result) => {

      result.json().then((res) => {
        alert('Successfully Deleted')
        getDetails()
      })
    })
  }


  function Edit(CompanyData) {

    // console.log(CompanyData)
    formik.setValues({
      CompanyName: CompanyData.CompanyName,
      CreatedBy: CompanyData.CreatedBy,
      CompanyAddress: CompanyData.CompanyAddress,
      Role: CompanyData.Role,
      Status: CompanyData.Status
    })

    setUpdateDetail(CompanyData)

    setHide(false)
    setHidebtn(true)
  }

  function Hidef() {

    formik.setValues(formIntialValues)
    setHide(true)
    setHidebtn(false)
  }

  function update() {
    // console.log(updateDetail.id)
    // console.log(formik.values)
    let item = formik.values
    fetch(`http://localhost:3829/CompanyDetails/${updateDetail.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((res) => {
        // console.log(res)
        alert('Updated')
        getDetails()
      })
    })
  }

  function Approve(CompanyDetails) {
    CompanyDetails.Status = 'APPROVED'
    // console.log(CompanyDetails.id)
    // console.log(formik.values=CompanyDetails)
    formik.values = CompanyDetails
    let item = formik.values
    // console.log(item)
    fetch(`http://localhost:3829/CompanyDetails/${CompanyDetails.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((res) => {
        // console.log(res)
        getDetails()
      })
    })
  }
  const searchItem = getData.filter((item) => {
    // console.log(i)

    if (search === '') {
      return item
    } else if (item.CreatedBy.toLowerCase().includes(search.toLowerCase())) {
      return item

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
          <h4 className="text-light">Welcome to admin dashboard</h4>
          <input type="text" placeholder="Search From CreatedBy" value={search} name="search" onChange={(e) => setSearch(e.target.value)} className="form-control " style={{ width: '50%' }} />
          <div className="d-flex">
            <button type="button" className="btn btn-success  " data-toggle="modal" data-target="#exampleModal" onClick={Hidef}>Create Company</button>&nbsp;&nbsp;
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
            <th scope="col">Action</th>



          </tr>
        </thead>
        {


          searchItem.map((CompanyDetails, i) =>

            <tbody key={i}>
              <tr className="bg-light" >
                <td>{CompanyDetails.id}</td>
                <td>{CompanyDetails.CompanyName}</td>
                <td>{CompanyDetails.CreatedBy}</td>
                <td>{CompanyDetails.CompanyAddress}</td>


                <td >
                  <button className="btn m-1 btnc" type="button" data-toggle="modal" data-target="#exampleModal" onClick={() => Edit(CompanyDetails)} >Edit Company</button> &nbsp;&nbsp;
                  <button className="btn m-1 btnc" onClick={() => DeleteUser(CompanyDetails)} >Delete</button>

                  <button className="btn m-1 btno" hidden={CompanyDetails.Status === 'APPROVED'} onClick={() => Approve(CompanyDetails)}>Approve</button>
                </td>
              </tr>
            </tbody>

          )}
      </table>



      <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel">{hide ? <h5>Registered Here Company Details</h5> : hide === false ? <h5>Edit Here Company Details</h5> : null}</div>
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

                  <input type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.CreatedBy} placeholder="Created by" name="CreatedBy" disabled hidden={hide} />

                </div>

                <div className="mb-1">

                  <input type="text" onBlur={formik.handleBlur} value={formik.values.CompanyAddress} onChange={formik.handleChange} className="form-control" placeholder=" Please Enter Company Address" name="CompanyAddress" />
                  {formik.errors.CompanyAddress && formik.touched.CompanyAddress ? <span style={{ color: 'red' }}>{formik.errors.CompanyAddress}</span> : null}

                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btno" data-dismiss="modal"  >Cancel</button>
              <button type="button" className="btn btnc" data-dismiss="modal" onClick={formik.handleSubmit} hidden={hidebtn} >Save</button>
              <button type="button" className="btn btnc" data-dismiss="modal" onClick={update} hidden={hide}>Update Details</button>
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
