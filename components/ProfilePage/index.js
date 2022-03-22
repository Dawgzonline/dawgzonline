import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../styled/Button";
import styles from "../../styles/Profile.module.scss";
import useForm from "../../hooks/useForm";
import { formContentType } from "../../constant/constant";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";

const ProfileInput = ({ title, content, inputName, show = true }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputClick = () => {
    if (!open) {
      setOpen(true);
      return;
    }
    if (inputValue === "") {
      setOpen(false);
    }
  };

  return (
    <div
      className={
        !open
          ? `${styles.profile_input}`
          : `${styles.profile_input} ${styles.profile_input_dim}`
      }
    >
      {!open && (
        <div style={{ alignSelf: "center" }}>
          <Typography
            variant="body1"
            color="myprimary.dark"
            className={styles.profile_input_title}
          >
            {title}
          </Typography>
          {content && show && (
            <Typography variant="body2" color="myprimary.main">
              {content}
            </Typography>
          )}
        </div>
      )}
      {open && (
        <input
          value={inputValue}
          name={inputName}
          placeholder="Enter text here"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      )}
      <EditIcon className={styles.global_icons} onClick={inputClick} />
    </div>
  );
};

export default function ProfilePage() {
  const [profileItem, setProfileItem] = useState([
    {
      title: "First Name",
      inputName: "firstName",
    },
    {
      title: "Last Name",
      inputName: "lastName",
    },
    {
      title: "Username",
      inputName: "username",
    },
    {
      title: "Email ID",
      inputName: "email",
    },
    {
      title: "Password",
      inputName: "password",
      show: false,
    },
    {
      title: "Mobile Number",
      inputName: "mobile",
    },
    {
      title: "Delivery Address 1",
      inputName: "address_1",
    },
    {
      title: "Delivery Address 2",
      inputName: "address_2",
    },
  ]);

  const { userData } = useContext(AuthContext);
  useEffect(() => {
    setProfileItem((profileItem) => [
      ...profileItem.map((item) => {
        if (userData[item.inputName]) {
          return { ...item, content: userData[item.inputName] };
        }
        return item;
      }),
    ]);
  }, [userData]);
  const { handleSubmission } = useForm({
    postTo: "/api/user/",
    contentType: formContentType.urlencoded,
    validate: (data) => {
      console.log(data);
      return { error: false };
    },
    afterSubmission: (res) => {
      console.log(res);
    },
    error: (msg) => {
      console.log(msg);
    },
  });
  return (
    <Box component="form" noValidate onSubmit={handleSubmission}>
      <div className={styles.profile_container}>
        <div className={styles.profile_inner_container}>
          <Typography
            variant="h4"
            color="myprimary.dark"
            variantMapping={{ h4: "h1" }}
          >
            PROFILE
          </Typography>
          {profileItem.map((item, index) => (
            <ProfileInput
              key={`profile_input_${index}`}
              title={item.title}
              content={item.content}
              inputName={item.inputName}
              show={item.show}
            />
          ))}

          <Button text="UPDATE" type="submit" />
        </div>
      </div>
    </Box>
  );
}
