import Head from "next/head";
import Navbar from "../components/Navbar";
import ProfilePage from "../components/ProfilePage";
import Footer from "../components/Footer";

export default function profile() {
    return (
        <div>
            <Head>
                <title>Dawgzonline Profile</title>
            </Head>
            <Navbar/>
            <ProfilePage />
            <Footer />
        </div>
    )
}
