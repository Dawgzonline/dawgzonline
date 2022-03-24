import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Typography, Button, Card, Grid, Radio } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../context/UtilityProvider";
import { AuthContext } from "../context/AuthProvider";
import getLocalFetch from "../libs/fetch";
import StyledButton from "../components/styled/Button";
import { useRouter } from "next/router";
import useCart from "../hooks/useCart";

const showState = {
  initial: "INITIAL",
  canShow: "CAN_SHOW",
  less_info: "LESS_INFORMATATION",
};
const CheckoutPage = () => {
  const { openLoading, closeLoading, openSnakebar } =
    useContext(UtilityContext);
  const { userData, user } = useContext(AuthContext);
  const [show, setShow] = useState(showState.initial);
  const { cart, empty } = useCart();

  useEffect(() => {
    if (user && userData._id) {
      console.log(userData);
      if (!userData.mobile || userData.mobile === "") {
        setShow(showState.less_info);
        return;
      }
      if (
        (!userData.address_1 || !userData.address_1 === "") &&
        (!userData.address_2 || !userData.address_2 === "")
      ) {
        setShow(showState.less_info);
        return;
      }
      setShow(showState.canShow);
    }
  }, [userData, user]);

  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(1);

  const handleOrder = async () => {
    if (window) {
      openLoading();
      const res = await getLocalFetch().post("/api/order", {
        cart: JSON.stringify(cart),
        address: userData[`address_${selectedAddress}`],
      });
      console.log(res);
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: res.data.amount,
        currency: "INR",
        name: "DawgzOnline",
        description: "A one stop store for your pets",
        image: "https://example.com/your_logo",
        order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          empty();
          router.push(`/order/${res.data.id}`);
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        openSnakebar(response.error.reason);
      });
      closeLoading();
      rzp1.open();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "var(--window-height)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ backgroundColor: "secondary.main", p: 1, mt: 2 }}>
        <Typography variant="subtitle2" color="primary.main">
          Checkout
        </Typography>
      </Box>
      {show === showState.canShow && (
        <Card
          sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle2" color="primary.main">
              {`${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`}
            </Typography>
            <Button
              variant="outlined"
              sx={{ borderRadius: 2 }}
              size="small"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Edit
            </Button>
          </Box>
          <Typography variant="body2" color="primary.light">
            Mobile Number &nbsp;
            <Typography
              variant="body2"
              color="primary.main"
              variantMapping={{ body2: "span" }}
            >
              {userData.mobile}
            </Typography>
          </Typography>
          <Typography variant="body2" color="primary.light">
            Email &nbsp;
            <Typography
              variant="body2"
              color="primary.main"
              variantMapping={{ body2: "span" }}
            >
              {userData.email}
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="subtitle2" color="primary.main">
              Address selection
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Radio
                  checked={selectedAddress === 1}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAddress(1);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" color="myprimary.main">
                  {userData.address_1}
                </Typography>
              </Grid>
              {userData.address_2 && userData.address_2 !== "" && (
                <>
                  <Grid item xs={2}>
                    <Radio
                      checked={selectedAddress === 2}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAddress(2);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" color="myprimary.main">
                      {userData.address_2}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: 2 }}
              size="small"
              onClick={() => {
                router.push("/cart");
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: 2 }}
              size="small"
              onClick={() => {
                handleOrder();
              }}
            >
              Pay
            </Button>
          </Box>
        </Card>
      )}
      {show === showState.less_info && (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle2" color="primary.main">
            Please fill mobile number , address for checkout
          </Typography>
          <StyledButton
            text={"Profile"}
            onClick={() => {
              router.push("/profile");
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default function checkout() {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Cart</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
      </Head>
      <Navbar />
      <CheckoutPage />
      <Footer />
    </div>
  );
}
