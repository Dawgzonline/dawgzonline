import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UtilityContext } from "../context/UtilityProvider";
import getLocalFetch from "../libs/fetch";

const CheckoutPage = () => {
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const handleOrder = async () => {
    if (window) {
      openLoading();
      const res = await getLocalFetch().post("/api/order", {
        cart: JSON.stringify(cart),
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
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      closeLoading();
      rzp1.open();
    }
  };
  return <Box></Box>;
};

export default function checkout() {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Cart</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
      </Head>
      <Navbar />
      <Footer />
    </div>
  );
}
