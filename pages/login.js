import Head from "next/head";
import LoginPage from "../components/LoginPage";

export default function profile() {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Login</title>
      </Head>

      <LoginPage />
    </div>
  );
}
