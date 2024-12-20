import styles from './loginPage.module.css'
import BrandImg from "../../assets/brand_img.png";
import { NavLink,useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { StyledForm,StyledFormInput,StyledFormItem,StyledPasswordInput } from './loginPage';
import axiosInstance from '../../axiosConfig/axiosConfig';

const AddUser=({size})=>{
    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

      const navigate=useNavigate()

      const onFinish= async(values) => {
       
       try{
        const response = await axiosInstance.post("/createaccount",values)
        if(response.status === 200){
           localStorage.setItem("token",response.data.token)
            navigate("/home")
        }
       }catch(error){
        if (error.response) {
            const { status, data } = error.response;
            const errorMessage = data?.errorMessage || "An error occurred";
            // Define a common function to set error for form fields
            const setFieldError = (fieldName, message) => {
              form.setFields([
                {
                  name: fieldName,
                  errors: [message],
                },
              ]);
            }
              // Handle different status codes and set appropriate field errors
        if (status === 404) {
            console.log("triggered")
            setFieldError("email", errorMessage);
          }
        }    
       }    
      };

      const validateEmail = (_, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        if (!value) {
          return Promise.reject(new Error("Email is required"));
        } else if (!emailRegex.test(value)) {
          return Promise.reject(new Error("Please enter a valid email address"));
        }
        return Promise.resolve();
      };
      const validatePassword = (_, value) => {
        const minLength = 8;
        const maxLength = 20;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (!value) {
          return Promise.reject(new Error("Password is required."));
        }
        if (value.length < minLength) {
          return Promise.reject(new Error(`Password must be at least ${minLength} characters.`));
        }
        if (value.length > maxLength) {
          return Promise.reject(new Error(`Password must not exceed ${maxLength} characters.`));
        }
        if (!specialCharRegex.test(value)) {
          return Promise.reject(new Error("Password must contain at least one special character."));
        }
        return Promise.resolve();
      };

      const validateName = (_, value) => {
        // Regular expression to match only letters and spaces
        const nameRegex = /^[A-Za-z\s]*$/;
    
        if (!value) {
            return Promise.reject(new Error("Required."));
          }
    
        if (!nameRegex.test(value)) {
          return Promise.reject(new Error('Name must contain only letters and spaces!'));
        }
    
        if (value.length > 20) {
          return Promise.reject(new Error('Name must be at most 20 characters!'));
        }
    
        return Promise.resolve(); // Valid input
      };
    
    return(
        <div className='w-full h-full'>
            <div className='flex flex-col gap-3 p-3 my-4'>
            <h1 className={styles.welcome_text}>Welcome to DocketPay</h1>
            <p className={styles.create_account_text}>Create an account to get access</p>
            <p className={`${styles.form_text}`}>
                Already have an account?
                <NavLink to="/login"  className={styles.create_now_text}>
                  Login
                </NavLink>
              </p>
              <div className='w-full md:w-4/5'>
              <StyledForm
          form={form}
          name={`createAccountForm${size}`}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
            <div className='lg:flex justify-between'>
             <StyledFormItem
            label={
              <>
                First Name
                <span className="required-star">*</span>
              </>
            }
            name="firstName"
            rules={[{ validator: validateName }]}
          >
            <StyledFormInput placeholder="Enter First Name" />
          </StyledFormItem>
          <StyledFormItem
            label={
              <>
                Last Name
                <span className="required-star">*</span>
              </>
            }
            name="lastName"
            rules={[{ validator: validateName }]}
          
          >
            <StyledFormInput placeholder="Enter Last Name" />
          </StyledFormItem>
          </div>
         
          <StyledFormItem
            label={
              <>
                Email
                <span className="required-star">*</span>
              </>
            }
            name="email"
            rules={[{ validator: validateEmail }]}
          >
            <StyledFormInput placeholder="Enter email address" />
          </StyledFormItem>
        
          <StyledFormItem
            label={
              <>
                Password
                <span className="required-star">*</span>
              </>
            }
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <StyledPasswordInput placeholder="Enter password" />
          </StyledFormItem>
          <StyledFormItem>
            <button
              className="w-full h-9 my-2 border rounded-lg text-white bg-blue-400 flex items-center justify-center gap-2"
              type="submit"
            >
              Create Account
            </button>
          </StyledFormItem>
        </StyledForm>
        </div>
              </div>
        </div>
    )
}


const CreateAccount = () => {
  return (
    <div className="w-screen h-screen">
        <div className='md:hidden'>
            <AddUser size="small"/>
        </div>
        <div className='hidden md:flex w-full h-full border border-blue-950'>
           <div className={`${styles.landing_page_container} w-1/3 h-full flex justify-center items-center`}>
                <img src={BrandImg} alt="Brand Logo" className="w-1/2" />
            </div>
            <div className='flex w-1/2 justify-center md:pl-3 lg:pl-12  border border-blue-950'>
            <AddUser size="large"/>
            </div>
        </div>
    </div>
  )
}

export default CreateAccount
