import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import sanityClient from "../../api/client";
import { Box } from "@mui/material";

const OrderPage = ({ order }) => {
  console.log(order);
  return <Box></Box>;
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
    ` *[ _type=="order" && razorpay_id=="${params.id}" && !(_id in path('drafts.**')) ]`
  );
  return {
    props: {
      order,
    },
  };
};
