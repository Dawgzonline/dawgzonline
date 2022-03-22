import Head from "next/head";
import Navbar from "../components/Navbar";
import AccountPage from "../components/AccountPage";
import Footer from "../components/Footer";

export default function profile() {
    return (
        <div>
            <Head>
                <title>Dawgzonline Account</title>
            </Head>
            <Navbar/>
            <AccountPage />
            <Footer />
        </div>
    )
}