import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import sanityClient from "../../api/client";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Divider,
} from "@mui/material";

const orderState = {
  CREATED: -1,
  PAID: 0,
};

const steps = [
  {
    label: "Order Created",
    description: "Order is created. It may take a while to be accepted",
  },
  {
    label: "Order Accepted",
    description: "Order is accepted. It will be dispatched soon.",
  },
  {
    label: "On the way",
    description: "Order is on the way to your door.",
  },
  {
    label: "Delived",
    description: "Order is completed",
  },
];
const OrderPage = ({ order }) => {
  const activeStep = orderState[order.status.toUpperCase()];
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
          {order.razorpay_id}
        </Typography>
      </Box>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ maxWidth: 240 }}
        >
          {steps.map((step, index) => (
            <Step key={`order_step_${index}`}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary.main" gutterBottom>
          Items
        </Typography>
        <Divider />
        <Box>
          {order.items.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 1,
                p: 1,
              }}
              key={`order_item-${index}`}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  gutterBottom
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="primary.main">
                {`${item.amount}  *  ${item.price}  =  ${
                  item.amount * item.price
                } Rs.`}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", my: 1, p: 1 }}
        >
          <Typography variant="subtitle2" color="primary.main" gutterBottom>
            Total Amount
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {`${order.items.reduce((prev, curr) => {
              return prev + curr.amount * curr.price;
            }, 0)} Rs.`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary.main" gutterBottom>
          Address
        </Typography>
        <Typography variant="body1" color="primary.main" gutterBottom>
          {order.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default function order({ order }) {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Order</title>
      </Head>
      <Navbar />
      <OrderPage order={order} />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const [order] = await sanityClient.fetch(
    ` *[ _type=="order" && razorpay_id=="${params.id}" && !(_id in path('drafts.**')) ]{
      _id,
      status,
      razorpay_id,
      "items" : items[]{
        "name" : product->name,
        "label" : variant->label,
        "price" : variant->discountedPrice,
        amount
      },
      address,
    }`
  );
  return {
    props: {
      order,
    },
  };
};
