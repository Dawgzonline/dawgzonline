import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../styles/Login.module.scss";

function Input({...props}) {
  return (
    <div className={styles.login_info}>
      <input  {...props}/>
      <EditIcon className={styles.global_icons} />
    </div>
  );
}

export default Input;
