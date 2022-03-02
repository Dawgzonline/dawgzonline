import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";

export default function wishlist() {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Wishlist</title>
      </Head>
      <Navbar />
      <Wishlist />
      <Footer />
    </div>
  );
}
