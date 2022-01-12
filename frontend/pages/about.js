import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutUsPage from "../components/AboutUsPage";

export default function contact() {
    return (
        <div>
          <Head>
            <title>Dawgzonline - contact us</title>
            </Head>  
            <Navbar />
            <AboutUsPage />
            <Footer />
        </div>
    )
}