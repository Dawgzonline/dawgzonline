import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TermsAndConditionsPage from "../components/TermsAndConditionsPage";

export default function terms_and_conditions() {
    return (
        <div>
          <Head>
            <title>Dawgzonline - Terms and Conditions</title>
            <link rel="icon" href="/mini-logo.webp"/>
            </Head>  
            <Navbar />
            <TermsAndConditionsPage />
            <Footer />
        </div>
    )
}