import styles from "./loginPage.module.css";

import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Divider, Form, Input } from "antd";

import styled from "styled-components";


import { Link, NavLink } from "react-router-dom";
import BrandImg from "../../assets/brand_img.png";
import axiosInstance from "../../axiosConfig/axiosConfig";

// Create a styled component for Input

// Styled Form.Item

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 15px; // Custom spacing between form items
  .ant-form-item-label{
    padding:0px !important;
    font-family:var(--font-public);
    font-size:var(--sub-heading)
    text-align:left !important;
  }

    .ant-form-item-required::after{
      display:none !important;
  }
       .ant-form-item-required::before{
      display:none !important;
  }
    .required-star {
      margin-left: 4px;
      color: red; // Customize * color
    }
  }

  .ant-form-item-explain-error{
    font-size:var(--main-para);
    font-family:var(--font-public);
    margin:3px 0px !important;
  }
`;

export const StyledFormInput = styled(Input)`
  width: 100%; // Custom width
  border-radius: 8px; // Rounded corners
  border: 1px solid #c9c9c9; // Green border
  background-color: white; // Light background color
  height: 40px;
  font-family: var(--font-public);
  font-size: var(--main-para);

  &:hover {
    border-color: #c9c9c9; // Darker green on hover
  }
  &:focus {
    border-color: #c9c9c9; // Green border on focus
    background-color: #fff; // White background on focus
    box-shadow: none;
  }

  &::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para);
  }
`;

// Styled Input.Password
export const StyledPasswordInput = styled(Input.Password)`
  width: 100%; // Custom width
  border-radius: 8px; // Rounded corners
  border: 1px solid #c9c9c9; // Green border
  background-color: white; // Light background color
  height: 40px;
  font-family: var(--font-public);
  font-size: var(--main-para);

  &:hover {
    border-color: #c9c9c9; // Darker green on hover
  }

  // Focus state
  &:focus,
  &:focus-within {
    border-color: #c9c9c9;
    box-shadow: none;
    background-color: #fff;
  }

  // Target the inner "eye" icon
  .ant-input-suffix {
    svg {
      color: #00000; // Color of the eye icon
      font-size: 18px;
    }
  }

  // For the input itself
  input {
    padding: 8px 12px;
    background-color: transparent;
    color: #333;
    &:focus {
      outline: none;
    }
  }

  input::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para);
  }
`;

export const EmailLogin = ({ onCancel }) => {
  const [form] = Form.useForm();

  const validatePassword = (_, value) => {
   

    if (!value) {
      return Promise.reject(new Error("Password is required."));
    }
    return Promise.resolve();
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

  const onFinish = async (values) => {
    const { email, password } = values;
    const requestData = { email, password };

    try {
      const response = await axiosInstance.post("/login", requestData);

      if (response.status === 200) {
          localStorage.setItem("token",response.data.token)
      }
    } catch (error) {
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
        };

        // Handle different status codes and set appropriate field errors
        if (status === 404) {
          setFieldError("email", errorMessage);
        } else if (status === 400) {
          setFieldError("password", errorMessage);
        }
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white h-full p-4 md:p-0 sm:p-4">
      <div className="md:hidden">
        <div className="flex w-2/3 justify-between align-middle">
          <button onClick={onCancel}>
            <FaArrowLeftLong fontSize={"16px"} />
          </button>
          <p className={`${styles.email_text} text-base`}>Login with Email</p>
        </div>
      </div>
      <div className="pt-5 md:pt-0">
        <StyledForm
          form={form}
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
          onFinishFailed={onFinishFailed}
        >
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
            <StyledPasswordInput placeholder="Enter your password" />
          </StyledFormItem>
          <Link to="/forgot-password" className={styles.forgot_password}>
            Forgot Password ?
          </Link>
          <StyledFormItem>
            <button
              className="w-full h-9 my-2 border rounded-lg text-white bg-blue-400 flex items-center justify-center gap-2"
              type="submit"
            >
              Login
            </button>
          </StyledFormItem>
        </StyledForm>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="w-screen h-screen">
      <div
        className={`${styles.landing_page_container} relative container h-full md:hidden`}
      >
        {showLogin ? (
          <EmailLogin onCancel={() => setShowLogin(false)} />
        ) : (
          <div className="h-full">
            <div className="h-3/4 flex justify-center items-center">
              <img src={BrandImg} alt="Brand Logo" className="w-4/5 h-auto" />
            </div>

            <div className="h-60 w-full absolute bottom-0 rounded-t-2xl px-8 py-6 bg-white flex flex-col gap-4">
              <div className="w-full h-12 border rounded-lg flex items-center justify-center gap-2">
                <FcGoogle />
                <p className={styles.email_text}>Continue with Google</p>
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  className={styles.login_secondary_btn}
                  onClick={() => setShowLogin(true)}
                >
                  Use other email ID
                </button>
              </div>
              <p className={`${styles.form_text}`}>
                Don't have an account ?{" "}
                <NavLink to="/create-account"  className={styles.create_now_text}>
                  Create one
                </NavLink>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex w-full h-4/5">

        <div className="relative w-1/2 justify-start p-7 pr-0 border-b">
          <div className="flex flex-col gap-2">
            <h1 className={styles.login_heading}>Get Started Now</h1>
            <p>Enter your credentials to access your account.</p>
            <div className="flex gap-3 w-96">
              <button className="w-1/2 h-9 border rounded-lg flex items-center justify-center gap-2 px-1">
                <FcGoogle />
                <p className={styles.email_text}>Continue with Google</p>
              </button>
              {/* <button className="w-1/2 h-9 border rounded-lg flex items-center justify-center gap-2">
                <FaFacebook />
                <p className={styles.email_text}>Login with Facebook</p>
              </button> */}
            </div>
          </div>
          <div className="w-4/5">
                
          <Divider plain style={{
      fontSize: '12px',
      color: '#ccc',
      borderColor: '#c9c9c9',
      
    }}>or</Divider>

         
          <EmailLogin onCancel={() => setShowLogin(false)} />

          <p className={`${styles.form_text}`}>
                Don't have an account ?{" "}
                <NavLink to="/create-account"  className={styles.create_now_text}>
                  Create one
                </NavLink>
              </p>
          </div>
        </div>

        <div className={`${styles.landing_page_container} h-full  w-1/2 flex justify-center items-center`}>
              <img src={BrandImg} alt="Brand Logo" className="w-1/2" />
            </div>
        </div>
        <div>
      </div>
    </div>
  );
};

export default LoginPage;
