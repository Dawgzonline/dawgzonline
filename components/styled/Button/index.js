import React from "react";
import { Typography } from "@mui/material";
import styles from "../../../styles/Button.module.scss";

export default function Button({ icon, text, disabled,...props }) {
  return (
    <button className={styles.styledButton} {...props} disabled={disabled}>
      {icon}
      <Typography variant="body1" color="myprimary.dark">
        {text}
      </Typography>
    </button>
  );
}
