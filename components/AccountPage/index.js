import React, { useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Badge,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import StyledButton from "../styled/Button";

const OrderCard = ({ order }) => {
  const {
    _id,
    _createdAt,
    trackingNumber = "8829282772992",
    amount,
    status,
    razorpay_id
  } = order;
  const quantity = order.items.reduce((prev, current) => {
    return prev + current.amount;
  }, 0);
  const router = useRouter();
  return (
    <Grid item xs={12}>
      <Card sx={{ p: 2, borderRadius: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle2" color="primary.main">
            Order ID : {razorpay_id}
          </Typography>
          <Typography
            variant="body2"
            color="primary.light"
            sx={{ width: "12ch", textAlign: "end" }}
          >
            {_createdAt.split("T")[0]}
          </Typography>
        </Box>
        <Typography variant="body2" color="primary.light">
          Tracking ID : &nbsp;
          <Typography
            variant="body2"
            color="primary.main"
            variantMapping={{ body2: "span" }}
          >
            {trackingNumber}
          </Typography>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
          <Typography variant="body2" color="primary.light">
            Quantity : &nbsp;
            <Typography
              variant="body2"
              color="primary.main"
              variantMapping={{ body2: "span" }}
            >
              {quantity}
            </Typography>
          </Typography>
          <Typography variant="body2" color="primary.light">
            Total Amount : &nbsp;
            <Typography
              variant="body2"
              color="primary.main"
              variantMapping={{ body2: "span" }}
            >
              {amount}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ borderRadius: 2 }}
            size="small"
            onClick={() => {
              router.push(`/order/${razorpay_id}`);
            }}
          >
            Details
          </Button>
          <Typography variant="subtitle2" color="primary.main">
            {status.toUpperCase()}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

const ProfileBox = ({ user }) => {
  const { logo, firstName, lastName, email } = user;
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        alignItems: "center",
        p: 1,
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <EditIcon
            color="primary"
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              p: 0.5,
              fontSize: "2rem",
            }}
          />
        }
        sx={{ my: 1 }}
      >
        <Avatar
          alt={`${firstName[0]}${lastName[0]}`}
          src={logo}
          sx={{ width: 80, height: 80 }}
        />
      </Badge>
      <Typography
        variant="subtitle1"
        color="primary.main"
        sx={{ lineHeight: "1.2" }}
      >
        {`${firstName} ${lastName}`}
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary.main"
        sx={{ lineHeight: "1.2" }}
      >
        {email}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Edit Profile
        </Button>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

function AccountPage() {
  const { userData, user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Box sx={{ minHeight: "var(--window-height)", p: 1 }}>
      {user && userData._id && (
        <>
          <ProfileBox user={userData} />
          <Box sx={{ backgroundColor: "secondary.main", p: 1 }}>
            <Typography variant="subtitle2" color="primary.main">
              ORDERS
            </Typography>
          </Box>
          <Grid container spacing={1.5} sx={{ pt: 1.5 }}>
            {userData.orders?.map((item, index) => (
              <OrderCard order={item} key={`order_card_${index}`} />
            ))}
            {userData.orders?.length === 0 && (
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" color="primary.main">
                  No order available
                </Typography>
              </Box>
            )}
          </Grid>
        </>
      )}
      {!user && (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle2" color="primary.main" sx={{ my: 4 }}>
            Please Login or Sign Up for accessing your account
          </Typography>
          <StyledButton
            text={"Sign Up"}
            onClick={() => {
              router.push("/signup");
            }}
          />
          <StyledButton
            text={"Login"}
            onClick={() => {
              router.push("/login");
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default AccountPage;
