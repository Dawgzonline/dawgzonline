import React from "react";
import { Typography } from "@mui/material";
import styles from "../../../styles/Button.module.scss";

export default function Button(props) {
  return (
    <button className={styles.styledButton} type="submit">
      {props.icon}
      <Typography variant={props.variant} color={props.color}>
        {props.text}
      </Typography>
    </button>
  );
}
