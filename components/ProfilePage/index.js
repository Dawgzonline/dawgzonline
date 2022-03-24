import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../styled/Button";
import styles from "../../styles/Profile.module.scss";
import useForm from "../../hooks/useForm";
import { formContentType } from "../../constant/constant";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";
import { UtilityContext } from "../../context/UtilityProvider";
import Close from "@mui/icons-material/Close";

const ProfileInput = ({
  title,
  content,
  inputName,
  show = true,
  value,
  setValue,
  type = "text",
}) => {
  const [open, setOpen] = useState(false);

  const inputClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (value === "" || value === content) {
      setOpen(false);
    }
  }, [value, content]);

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
      {open && type !== "textarea" && (
        <input
          value={value}
          name={inputName}
          placeholder="Enter text here"
          type={type}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      )}
      {open && type == "textarea" && (
        <textarea
          value={value}
          name={inputName}
          placeholder="Enter text here"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={4}
        />
      )}
      {!open && (
        <EditIcon className={styles.global_icons} onClick={inputClick} />
      )}
      {open && <Close className={styles.global_icons} onClick={inputClick} />}
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
      type: "password",
      show: false,
    },
    {
      title: "Mobile Number",
      inputName: "mobile",
    },
    {
      title: "Delivery Address 1",
      inputName: "address_1",
      type: "textarea",
    },
    {
      title: "Delivery Address 2",
      inputName: "address_2",
      type: "textarea",
    },
  ]);

  const { userData, reload } = useContext(AuthContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    address_1: "",
    address_2: "",
  });
  useEffect(() => {
    setProfileItem((profileItem) => [
      ...profileItem.map((item) => {
        if (userData[item.inputName]) {
          return { ...item, content: userData[item.inputName] };
        }
        return item;
      }),
    ]);
    setData((data) => {
      const customData = {};
      for (let [key, value] of Object.entries(userData)) {
        if (!value) {
          continue;
        }
        customData[key] = value;
      }
      return {
        ...data,
        ...customData,
      };
    });
  }, [userData]);
  const { openLoading, closeLoading, openSnakebar } =
    useContext(UtilityContext);
  const { handleSubmission, loading } = useForm({
    postTo: "/api/user/",
    contentType: formContentType.urlencoded,
    validate: (data) => {
      console.log(data);
      return { error: false };
    },
    afterSubmission: (res) => {
      console.log(res);
      setData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        mobile: "",
        address_1: "",
        address_2: "",
      });
      openSnakebar(res.data.message);
      reload();
    },
    error: (msg) => {
      openSnakebar(msg);
      console.log(msg);
    },
  });
  useEffect(() => {
    if (loading) {
      openLoading();
      return;
    }
    closeLoading();
  }, [loading, openLoading, closeLoading]);
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
              type={item.type}
              value={data[item.inputName]}
              setValue={(newValue) => {
                setData((data) => {
                  return {
                    ...data,
                    [item.inputName]: newValue,
                  };
                });
              }}
            />
          ))}

          <Button text="UPDATE" type="submit" />
        </div>
      </div>
    </Box>
  );
}
