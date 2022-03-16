import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../styles/Login.module.scss";

function Input() {
  return (
    <div className={styles.login_info}>
      <input name="password" type="password" placeholder="Password" />
      <EditIcon className={styles.global_icons} />
    </div>
  );
}

export default Input;
