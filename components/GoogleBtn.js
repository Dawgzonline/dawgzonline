import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthProvider";
import GoogleLogin from "react-google-login";
import { authentication } from "../constant/constant";
import getFetch from "../libs/fetch";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "./styled/Button";

export default function GoogleBtn({ action, setError }) {
  const { addToken, addUser } = useContext(AuthContext);
  const router = useRouter();

  const postVendorRegister = async (token) => {
    try {
      const clientFetch = getFetch();
      const res = await clientFetch.post(`/api/signup?googleToken=${token}`);
      router.push("/login");
      console.log(res);
    } catch (e) {
      console.log(e);
      console.log(e?.response);
      setError(e?.response?.data?.message);
    }
  };
  const postVendorLogin = async (token) => {
    try {
      const clientFetch = getFetch();
      const res = await clientFetch.post(`/api/login?googleToken=${token}`);
      addUser({ id: res.data._id });
      addToken(res.data.token);
      router.push("/");
    } catch (e) {
      console.log(e);
      console.log(e?.response);
      setError(e?.response?.data?.message);
    }
  };
  const handleSuccess = (response) => {
    console.log(response);
    const token = response?.tokenId;
    switch (action) {
      case authentication.login:
        postVendorLogin(token);
        break;
      case authentication.signup:
        postVendorRegister(token);
        break;
      default:
        break;
    }
  };
  const handleFailure = (response) => {
    console.log(response);
    setError("Please check your net connection.");
  };
  return (
    <GoogleLogin
      render={(renderProps) => {
        if (action === authentication.login) {
          return (
            <IconButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              sx={{
                border: "0.1rem solid",
                borderColor: "primary.main",
                borderRadius: 4,
              }}
            >
              <GoogleIcon color="primary" />
            </IconButton>
          );
        }
        return (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            icon={<GoogleIcon />}
            text=" SIGN UP WITH GOOGLE"
            style={{ marginTop: "0rem" }}
          />
        );
      }}
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
