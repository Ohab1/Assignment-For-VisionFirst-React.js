import { useFormik } from "formik"
import { useState } from "react"

import { LoginFormValidation } from '../FormValidation'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
  const [passwordType, SetPasswordType] = useState(false)
  const navigate = useNavigate()
  const formIntialValues = {
    //   name: '',
    //   email: '',
    //   mobile: '',
    username: '',
    password: ''
    //   role: ''
  }

  const formik = useFormik({
    initialValues: formIntialValues,
    validationSchema: LoginFormValidation,
    onSubmit: (values, userValues) => {
      // console.log(values)

      userValues.resetForm()
      // json-server --watch db.json --port 3829 json start command
      fetch('http://localhost:3829/RegisterUsers')
        .then((res) => res.json())
        .then((data) => {

          const loginuser = data.filter((user) => {
            return user.username === values.username && user.password === values.password
          });

          if (loginuser.length === 1 && loginuser && loginuser[0].role === 'IT_ADMIN') {
            localStorage.setItem('name', loginuser[0].name)
            navigate('/AdminScreen')
          } else if (loginuser.length === 1 && loginuser && loginuser[0].role === 'IT_USER_NORMAL') {
            localStorage.setItem('name', loginuser[0].name)
            navigate('/NormalUserScreen')
          } else if (loginuser.length === 0) {
            alert('User not found!')
          } else {
            alert('Something is wrong! Please Contact Md Ohab')
          }


        }

        )


    }
  })



  return (
    <div className="container m-5  d-flex justify-content-center" >
      <div className="card rgcard " style={{ width: '30rem', background: 'rgb(153, 215, 253)' }}>
        <div className="card-body">


          <h5 className="text-center text-dark">Please Login </h5>

          <form onSubmit={formik.handleSubmit}>


            <input type="text" className="form-control" name="username" placeholder="Enter User Name" onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange} />
            {formik.errors.username && formik.touched.username ? <span style={{ color: 'red' }}>{formik.errors.username}</span> : null}<br />


            <div id="eyee">
              <input type={passwordType ? 'text' : 'password'} className="form-control" name="password" placeholder="Enter Password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} />

              {formik.errors.password && formik.touched.password ? <span style={{ color: 'red' }}>{formik.errors.password}</span> : null}
              <br />
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" onClick={() => SetPasswordType(!passwordType)} className="eye bi  bi-eye">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>

            </div>





            <button className="btn btn-primary mt-2" type="submit" disabled={false}>Login</button>
            &nbsp;  <button type="reset" className="btn btn-dark mt-2">Cancel</button> &nbsp; <span>Don't have account? <Link to="/register">Register here</Link></span>
          </form>
        </div>
      </div>
    </div>
  )
}
