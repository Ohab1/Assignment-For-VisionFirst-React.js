import { useFormik } from "formik"
import { useState } from "react"
import './Register.css'
import { RegisterFormValidation } from '../FormValidation'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
    const [passwordType, SetPasswordType] = useState(false)
    const navigate = useNavigate()
    const formIntialValues = {
        name: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        role: ''
    }
    const formik = useFormik({
        initialValues: formIntialValues,
        validationSchema: RegisterFormValidation,
        onSubmit: (values, userValues) => {
            // console.log(values)
            userValues.resetForm()
            // json-server --watch db.json --port 3829 json start command
            fetch('http://localhost:3829/RegisterUsers', {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
                .then((response) => response.json())
                .then((data) => {// console.log('Success:', data);
                    alert('Congratulations You have been registered Sucessfully')
                    navigate('/login')
                })
                .catch((error) => {
                    alert('Internal Server Error')
                    alert('If Found Any Please Contact Md Ohab')
                    // console.error('Error:', error);
                });
        }
    })

    return (
        <div className="container mt-2  d-flex justify-content-center">
            <div className="card rgcard " style={{ width: '30rem', background: 'rgb(167, 229, 227)' }}>
                <div className="card-body">


                    <h5 className="text-center text-dark">Please Register Your Details </h5>

                    <form onSubmit={formik.handleSubmit}>
                        <input type="text" className="form-control mb-1" name="name" placeholder="Enter Name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
                        {formik.errors.name && formik.touched.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : null}<br />

                        <input type="email" className="form-control" name="email" placeholder="Enter Email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email && formik.touched.email ? <span style={{ color: 'red' }}>{formik.errors.email}</span> : null}<br />

                        <input type="text" className="form-control" name="mobile" placeholder="Enter Mobile Number" onBlur={formik.handleBlur} value={formik.values.mobile} onChange={formik.handleChange} />
                        {formik.errors.mobile && formik.touched.mobile ? <span style={{ color: 'red' }}>{formik.errors.mobile}</span> : null}<br />

                        <input type="text" className="form-control" name="username" placeholder="Enter User Name" onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange} />
                        {formik.errors.username && formik.touched.username ? <span style={{ color: 'red' }}>{formik.errors.username}</span> : null}<br />


                        <div id="eyee">
                            <input type={passwordType ? 'text' : 'password'} className="form-control" name="password" placeholder="Enter Password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} />

                            {formik.errors.password && formik.touched.password ? <span style={{ color: 'red' }}>{formik.errors.password}</span> : null}
                            <br />
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" onClick={() => SetPasswordType(!passwordType)} className="eye bi bi-eye">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>

                        </div>


                        <select name="role" className="mt-1" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Please Select Your Role</option>
                            <option value="IT_ADMIN">IT_ADMIN</option>
                            <option value="IT_USER_NORMAL">IT_USER_NORMAL</option>
                        </select> <br />
                        {formik.errors.role && formik.touched.role ? <span style={{ color: 'red' }}>{formik.errors.role}</span> : null}  <br />


                        <button className="btn btn-primary mt-2" type="submit" disabled={false}>Register</button>
                        &nbsp; <span>Already have account ?<Link to="/login">Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}