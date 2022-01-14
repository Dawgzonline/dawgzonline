import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Typography } from "@mui/material";
import styles from '../../styles/Signup.module.scss';

export default function SignUpPage() {
  const error = {
    none: "ERROR_NONE",
    firstName: "ERROR_IN_FIRST_NAME",
    lastName: "ERROR_IN_LAST_NAME",
    email: "ERROR_IN_EMAIL",
    password: "ERROR_IN_PASSWORD",
    confirmPassword: "ERROR_IN_CONFIRM_PASSWORD",
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [validationError, setValidationError] = useState({
    error: error.none,
    message: "",
  });

  const validateData = () => {
    if (firstName === "") {
      setValidationError({
        error: error.firstName,
        message: "Mandatory Feild",
      });
    } else if (lastName === "") {
      setValidationError({ error: error.lastName, message: "Mandatory Feild" });
    } else if (email === "") {
      setValidationError({ error: error.email, message: "Mandatory Feild" });
    } else if (password === "") {
      setValidationError({ error: error.password, message: "Mandatory Feild" });
    } else if (confirmPassword === "") {
      setValidationError({
        error: error.confirmPassword,
        message: "Mandatory Feild",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateData();
  };

  return (
    <div className={styles.signup-container}>
      <div className={styles.signup-inner-container}>
        <Typography variant="h4" color="myprimary.dark" variantMapping={{h4 : "h1"}}>SIGN UP</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="body1" color="myprimary.dark">First Name</Typography>
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="Enter the text here"
          />
          {validationError.error === error.firstName && (
            <Typography variant="body2" color="myprimary.main" className={styles.signup-validation-error}>
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">Last Name</Typography>
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Enter the text here"
          />
          {validationError.error === error.lastName && (
            <Typography variant="body2" color="myprimary.main" className={styles.signup-validation-error}>
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">Email ID</Typography>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter the text here"
          />
          {validationError.error === error.email && (
            <Typography variant="body2" color="myprimary.main" className={styles.signup-validation-error}>
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">Password</Typography>
          <div style={{position : "relative"}}>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={!passwordVisibility ? "password" : "text"}
              placeholder="Enter the text here"
            />
            {!passwordVisibility && <VisibilityIcon className={styles.signup-visibility} onClick={()=>{setPasswordVisibility(true)}}/> }
            {passwordVisibility && <VisibilityOffIcon className={styles.signup-visibility} onClick={()=>{setPasswordVisibility(false)}}/>} 
          </div>
          {validationError.error === error.password && (
            <Typography variant="body2" color="myprimary.main" className={styles.signup-validation-error}>
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">Confirm Password</Typography>
          <div style={{position : "relative"}}>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type={!confirmPasswordVisibility ? "password" : "text"}
              placeholder="Enter the text here"
            />
            {!confirmPasswordVisibility && <VisibilityIcon className={styles.signup-visibility} onClick={()=>{setConfirmPasswordVisibility(true)}}/> }
            {confirmPasswordVisibility && <VisibilityOffIcon className={styles.signup-visibility} onClick={()=>{setConfirmPasswordVisibility(false)}}/>} 
          </div>
          {validationError.error === error.confirmPassword && (
            <Typography variant="body2" color="myprimary.main" className={styles.signup-validation-error}>
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <button type="submit"><Typography variant="body1" color="myprimary.dark">CREATE ACCOUNT</Typography></button>
        </form>
        <button>
          <GoogleIcon /> <Typography variant="body1" color="myprimary.dark">SIGN UP WITH GOOGLE</Typography>
        </button>
      </div>
    </div>
  );
}
