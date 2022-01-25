import React, {useState} from "react";
import Image from "next/image";
import { Box, Alert, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useForm from "../../hooks/useForm";
import styles from "../../styles/Login.module.scss";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { error, formContentType } from "../../constant/constant";

export default function LoginPage() {
  const [validationError, setValidationError] = useState({
    error: error.none,
    message: "",
  });
  const [infoError, setError] = useState("");

  const validateData = ({ username, password }) => {
    if (username === "") {
      setValidationError({ error: error.username, message: "Mandatory Feild" });
      return false;
    } else if (password === "") {
      setValidationError({ error: error.password, message: "Mandatory Feild" });
      return false;
    }
    return true;
  };

  const { handleSubmission } = useForm({
    contentType: formContentType.urlencoded,
    postTo: "/api/login",
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
    <div className={styles.login_container}>
      <div className={styles.image_container}>
        <Image alt="" src="/logo.png" width="200" height="200" />
      </div>
      <Box component="form" onSubmit={handleSubmission} noValidate>
        <div className={styles.login_details}>
        <Box>
          {infoError !== "" && <Alert severity="error" sx={{color : "myprimary.dark"}}>{infoError}</Alert>}
        </Box>
          <div className={styles.login_info}>
            <input name="username" type="text" placeholder="Username" />
            <EditIcon className={styles.global_icons} />
          </div>
          {validationError.error === error.username && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}
          <div className={styles.login_info}>
            <input name="password" type="password" placeholder="Password" />
            <EditIcon className={styles.global_icons} />
          </div>
          {validationError.error === error.password && (
            <Typography
              variant="body2"
              color="myprimary.main"
              className={styles.validation_error}
            >
              <WarningAmberIcon /> {validationError.message}
            </Typography>
          )}

          <button type="submit">LOGIN</button>
          <ul>
            <li>Forgot Password?</li>
            <li>New User ?Sign up</li>
          </ul>
        </div>
      </Box>
    </div>
  );
}
