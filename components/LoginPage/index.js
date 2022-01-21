import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../styles/Login.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.login_container}>
      <div className={styles.image_container}>
        <Image alt="" src="/logo.png" width="200" height="200" />
      </div>
      <div className={styles.login_details}>
        <div className={styles.login_info}>
          <input type="text" placeholder="Username" />
          <EditIcon className={styles.global_icons} />
        </div>
        <div className={styles.login_info}>
          <input type="password" placeholder="Password" />
          <EditIcon className={styles.global_icons} />
        </div>

        <button type="submit">LOGIN</button>
        <ul>
          <li>Forgot Password?</li>
          <li>New User ?Sign up</li>
        </ul>
      </div>
    </div>
  );
}
