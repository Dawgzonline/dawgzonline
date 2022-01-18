import Head from "next/head";
import SignUpPage from "../components/SignUpPage";

export default function profile() {
    return (
        <div>
            <Head>
                <title>Dawgzonline - Sign Up</title>
            </Head>
            
            <SignUpPage />
        </div>
    )
}