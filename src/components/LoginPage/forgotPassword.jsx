import React from 'react'
import styles from './loginPage.module.css'
import { StyledForm, StyledFormInput, StyledFormItem } from './loginPage'
import BrandImg from "../../assets/brand_img.png";
import { Form} from "antd"
const ForgotPassword = () => {

    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
      const onFinish = (values) => {
        console.log("success:", values);
      };
      const validateEmail = (_, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          return Promise.reject(new Error("Email is required"));
        } else if (!emailRegex.test(value)) {
          return Promise.reject(new Error("Please enter a valid email address"));
        }
        return Promise.resolve();
      };
    
  return (
    <div className='w-screen h-screen'>
        <div className='w-full h-full md:flex border border-red-600'>
      <div className='p-3 pt-7 flex flex-col md:w-1/2 border border-red-600'>
   
        <h1 className={`${styles.welcome_text} text-center`}>Forgot Password</h1>
        <p className={`${styles.description} text-center`}>No worries! Enter your associated email & we will send you OTP to reset your password.</p>
        <div className='border border-red-600'>
        <StyledForm  form={form}
          name="loginForm"
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
          onFinishFailed={onFinishFailed}>
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
                      <StyledFormItem>
                        <button     className="w-full h-9 my-2 border rounded-lg text-white bg-blue-400 flex items-center justify-center gap-2"
              type="submit">Submit</button>
                      </StyledFormItem>
          </StyledForm>
    </div>
      </div>
      <div className='hidden md:block w-1/2'>
      <div className={`${styles.landing_page_container} h-full flex justify-center items-center`}>
                <img src={BrandImg} alt="Brand Logo" className="w-1/2" />
            </div>
      </div>
      </div>
    </div>
  )
}

export default ForgotPassword
