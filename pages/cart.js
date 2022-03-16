import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function cart() {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Cart</title>
      </Head>
      <Navbar />
      <Cart />
      <Footer />
    </div>
  );
}
