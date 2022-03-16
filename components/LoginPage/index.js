import React, { useContext, useState } from "react";
import Image from "next/image";
import { Box, Alert, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useForm from "../../hooks/useForm";
import styles from "../../styles/Login.module.scss";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { error, formContentType } from "../../constant/constant";
import Button from "../styled/Button";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import GoogleBtn from "../GoogleBtn";
import { authentication } from "../../constant/constant";

export default function LoginPage() {
  const { addToken } = useContext(AuthContext);
  const router = useRouter();
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
      addToken(res.data.token);
      router.push("/");
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
            {infoError !== "" && (
              <Alert severity="error" sx={{ color: "myprimary.dark" }}>
                {infoError}
              </Alert>
            )}
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
          <Box
            sx={{
              display: "flex",
              p: 0.5,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <GoogleBtn
              action={authentication.login}
              setError={(msg) => {
                setError(msg);
              }}
            />
          </Box>
          <Button
            text="LOGIN"
            type="submit"
            style={{
              padding: "0.4rem 2rem",
              borderRadius: "1.2rem",
              marginBottom: "1rem",
            }}
          />
          <ul>
            <Typography
              variant="body2"
              variantMapping={{ body2: "li" }}
              color="myprimary.main"
              onClick={() => {
                router.push("/forget-password");
              }}
            >
              Forgot Password?
            </Typography>

            <Typography
              variant="body2"
              variantMapping={{ body2: "li" }}
              color="myprimary.main"
              onClick={() => {
                router.push("/signup");
              }}
            >
              New User ?Sign up
            </Typography>
          </ul>
        </div>
      </Box>
    </div>
  );
}
