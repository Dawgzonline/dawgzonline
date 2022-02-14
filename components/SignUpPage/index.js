import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Alert, Typography } from "@mui/material";
import useForm from "../../hooks/useForm";
import styles from "../../styles/Signup.module.scss";
import { error, formContentType } from "../../constant/constant";
import Button from "../styled/Button";

export default function SignUpPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [validationError, setValidationError] = useState({
    error: error.none,
    message: "",
  });
  const [infoError, setError] = useState("");

  const validateData = ({
    lastName,
    firstName,
    email,
    password,
    confirmPassword,
  }) => {
    if (firstName === "") {
      setValidationError({
        error: error.firstName,
        message: "Mandatory Feild",
      });
      return false;
    } else if (lastName === "") {
      setValidationError({ error: error.lastName, message: "Mandatory Feild" });
      return false;
    } else if (email === "") {
      setValidationError({ error: error.email, message: "Mandatory Feild" });
      return false;
    } else if (password === "") {
      setValidationError({ error: error.password, message: "Mandatory Feild" });
      return false;
    } else if (confirmPassword === "") {
      setValidationError({
        error: error.confirmPassword,
        message: "Mandatory Feild",
      });
      return false;
    }
    return true;
  };

  const { handleSubmission } = useForm({
    contentType: formContentType.urlencoded,
    postTo: "/api/signup",
    validate: (data) => {
      const isValid = validateData(data);
      return isValid ? { error: false } : { error: true };
    },
    afterSubmission: (res) => {
      console.log(res);
    },
    error: (msg) => {
      setError(msg);
    },
  });

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_inner_container}>
        <Typography
          variant="h4"
          color="myprimary.dark"
          variantMapping={{ h4: "h1" }}
        >
          SIGN UP
        </Typography>
        <Box sx={{ my: 1 }}>
          {infoError !== "" && (
            <Alert severity="error" sx={{ color: "myprimary.dark" }}>
              {infoError}
            </Alert>
          )}
        </Box>
        <form noValidate onSubmit={handleSubmission}>
          <Typography variant="body1" color="myprimary.dark">
            First Name
          </Typography>
          <input
            name="firstName"
            type="text"
            placeholder="Enter the text here"
          />
          {validationError.error === error.firstName && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.signup_validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">
            Last Name
          </Typography>
          <input
            name="lastName"
            type="text"
            placeholder="Enter the text here"
          />
          {validationError.error === error.lastName && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.signup_validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">
            Email ID
          </Typography>
          <input type="email" name="email" placeholder="Enter the text here" />
          {validationError.error === error.email && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.signup_validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">
            Password
          </Typography>
          <div style={{ position: "relative" }}>
            <input
              type={!passwordVisibility ? "password" : "text"}
              placeholder="Enter the text here"
              name="password"
            />
            {!passwordVisibility && (
              <VisibilityIcon
                className={styles.signup_visibility}
                onClick={() => {
                  setPasswordVisibility(true);
                }}
              />
            )}
            {passwordVisibility && (
              <VisibilityOffIcon
                className={styles.signup_visibility}
                onClick={() => {
                  setPasswordVisibility(false);
                }}
              />
            )}
          </div>
          {validationError.error === error.password && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.signup_validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <Typography variant="body1" color="myprimary.dark">
            Confirm Password
          </Typography>
          <div style={{ position: "relative" }}>
            <input
              type={!confirmPasswordVisibility ? "password" : "text"}
              placeholder="Enter the text here"
              name="confirmPassword"
            />
            {!confirmPasswordVisibility && (
              <VisibilityIcon
                className={styles.signup_visibility}
                onClick={() => {
                  setConfirmPasswordVisibility(true);
                }}
              />
            )}
            {confirmPasswordVisibility && (
              <VisibilityOffIcon
                className={styles.signup_visibility}
                onClick={() => {
                  setConfirmPasswordVisibility(false);
                }}
              />
            )}
          </div>
          {validationError.error === error.confirmPassword && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.signup_validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          {/* <button type="submit">
            <Typography variant="body1" color="myprimary.dark">
              CREATE ACCOUNT
            </Typography>
          </button> */}
          <Button text="CREATE ACCOUNT" type="submit" />
        </form>
        {/* <button>
          <GoogleIcon />{" "}
          <Typography variant="body1" color="myprimary.dark">
            SIGN UP WITH GOOGLE
          </Typography>
        </button> */}
        <Button icon={<GoogleIcon />} text=" SIGN UP WITH GOOGLE" />
      </div>
    </div>
  );
}
