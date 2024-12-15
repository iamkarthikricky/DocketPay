
import { MdEmail } from "react-icons/md";
import styles from "./loginPage.module.css";

import { useState } from "react";
import { FaArrowLeftLong, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

import BrandImg from "../../assets/brand_img.png";

const EmailLogin = ({ handleCancel }) => {
  const [seePassword, setSeePassword] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const [userPassword, setUserPassword] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // Password validation rules
  const minLength = userPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(userPassword);
  const hasLowercase = /[a-z]/.test(userPassword);
  const hasNumber = /\d/.test(userPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPassword);

  return (
    <div className={styles.email_login_container}>
      <div className={styles.email_login_header}>
        <div
          className={styles.login_flex_row_container}
          style={{ width: "60%", justifyContent: "space-between" }}
        >
          <FaArrowLeftLong
            style={{ cursor: "pointer" }}
            onClick={handleCancel}
          />
          <p className={styles.email_text} style={{ textAlign: "center" }}>
            Login with Email
          </p>
        </div>
    </div>
    <div>
        <form className={styles.login_form_main_container}>
          <div className={styles.label_container}>
            <label className={styles.login_form_label} htmlFor="email-address">
              Email
            </label>
            <div className={styles.login_form_input_tag_container}>
              <input
                type="email"
                id="email-address"
                className={styles.login_form_input_tag}
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className={styles.label_container}>
            <label className={styles.login_form_label} htmlFor="user-password">
              Password
            </label>
            <div className={styles.login_flex_row_container}>
              <div
                className={styles.login_form_input_tag_container}
                style={{ justifyContent: "space-between" }}
              >
                <input
                  type={seePassword ? "text" : "password"}
                  id="user-password"
                  value={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className={styles.login_form_input_tag}
                   placeholder="Enter your password"
                />
                {!!userPassword && 
                <button
                  onClick={() => setSeePassword(!seePassword)}
                  type="button"
                  className={styles.seePassword_btn}
                  disabled={!userPassword}
                >
                  {seePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
}
              </div>
            </div>
          </div>

          {isPasswordFocused && (
            <ul className={styles.password_validation_ul_list}>
              <li style={{ color: minLength ? "green" : "red" }}>
                {minLength ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                <p>Password must have atleast 8 characters</p>
              </li>
              <li style={{ color: hasUppercase ? "green" : "red" }}>
                {hasUppercase ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                <p>Password must have an Uppercase letter</p>
              </li>
              <li style={{ color: hasLowercase ? "green" : "red" }}>
                {hasLowercase ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                <p>Password must have a Lowercase letter</p>
              </li>
              <li style={{ color: hasNumber ? "green" : "red" }}>
                {hasNumber ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                <p>Password must contain a number</p>
              </li>
              <li style={{ color: hasSpecialChar ? "green" : "red" }}>
                {hasSpecialChar ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                <p>Password must contain a special character</p>
              </li>
            </ul>
          )}

          <button className={styles.login_btn} type="button">
            Login
          </button>
          <div
            className={styles.login_flex_col_container}
            style={{ gap: "10px", alignItems: "flex-start" }}
          >
            <a href="#" className={styles.create_now_text}>
              Forgot password?
            </a>
            <p className={styles.form_text}>
              Don't have an account ?{" "}
              <a href="#" className={styles.create_now_text}>
                Create now
              </a>
            </p>
          </div>
        </form>
    </div>
      </div>
  );
};

const LoginPage = () => {
  const [isEmailLogin, setEmailLogin] = useState(false);

  return (
    <div className={styles.login_main_container}>
      <div className={styles.mobile_view}>
        {isEmailLogin ? (
          <EmailLogin handleCancel={() => setEmailLogin(false)} />
        ) : (
          <div className={styles.landing_page_container}>
            <div className={styles.branding_img_container}>
              <img src={BrandImg} className={styles.brand_logo} />
            </div>
            <div className={styles.login_form_container}>
              <div
                className={styles.login_bar}
                onClick={() => setEmailLogin(true)}
              >
                <div
                  className={`${styles.login_flex_row_container}`}
                  style={{ gap: "10px", justifyContent: "center" }}
                >
                  <MdEmail />
                  <p className={styles.email_text}>Login with email</p>
                </div>
              </div>

              <div
                className={styles.login_flex_row_container}
                style={{ gap: "10px", width: "100%" }}
              >
                <div className={styles.social_icon_btn}>
                  <FcGoogle />
                </div>
                <div className={styles.social_icon_btn}>
                  <FaFacebook />
                </div>
              </div>
              <p className={styles.form_text}>
                Don't have an account ?{" "}
                <a href="#" className={styles.create_now_text}>
                  Create now
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* <div className={styles.large_view}>
        <div className={styles.login_flex_row_container}>
          <div
            className={styles.login_form_container}
            style={{ alignItems: "flex-start" }}
          >
            <h1 className={styles.login_heading}>Get Started Now</h1>
            <p>Enter your credentials to access your account.</p>

            <div
              className={styles.login_flex_row_container}
              style={{ gap: "10px", width: "100%" }}
            >
              <div className={styles.social_icon_btn}>
                <FcGoogle /> <p>Login with Google</p>
              </div>
              <div className={styles.social_icon_btn}>
                <FaFacebook />
                <p>Login with Facebook</p>
              </div>
            </div>

           
           <EmailLogin />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LoginPage;
