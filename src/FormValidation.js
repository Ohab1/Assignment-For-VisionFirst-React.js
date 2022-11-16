
import * as yup from "yup"


  export const  RegisterFormValidation = yup.object({
        name: yup.string().min(3).max(30).required('Please Enter Correct Name'),
        email: yup.string().email().required('Please Enter Correct Email'),
        mobile: yup.number().required('Please Enter Correct Mbile Number').moreThan(10),
        username: yup.string().min(3).max(30).required('Please Enter Correct User Name'),
        password: yup
            .string()
            .required('Please Enter your password')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
       role:yup.string().required('Please Select Valid Role')     
    })
  export const  LoginFormValidation= yup.object({
      
        username: yup.string().min(3).max(30).required('Please Enter Correct User Name'),
        password: yup
            .string()
            .required('Please Enter your password')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
       
    })
  
  export const  AdminFormValidation= yup.object({
      
    CompanyName: yup.string().min(3).max(30).required('Please Enter Correct User Name'),
    CompanyAddress: yup.string().min(3).max(30).required('Please Enter Correct User Name'),
       
       
    })
  
