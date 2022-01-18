import Head from "next/head";
import ProfilePage from "../components/ProfilePage";

export default function profile() {
    return (
        <div>
            <Head>
                <title>Dawgzonline Profile</title>
            </Head>
            
            <ProfilePage />
        </div>
    )
}
