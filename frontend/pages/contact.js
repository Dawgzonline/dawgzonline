import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUsPage from "../components/ContactUsPage";

export default function contact() {
    return (
        <div>
          <Head>
            <title>Dawgzonline - contact us</title>
            </Head>  
            <Navbar />
            <ContactUsPage />
            <Footer />
        </div>
    )
}
