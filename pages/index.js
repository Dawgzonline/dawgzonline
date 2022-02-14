import Head from "next/head";
import Footer from "../components/Footer";
import MainPage from "../components/MainPage";
import Navbar from "../components/Navbar";
import sanityClient from "../sanity/client";

export default function Home({banner}) {
  return (
    <div>
      <Head>
        <title>Dawgzonline </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mini-logo.webp" />
      </Head>
      <Navbar />
      <MainPage banner={banner}/>
      <Footer />
    </div>
  );
}

export const getStaticProps = async() => {
  
  const banner = await sanityClient.fetch(` *[ _type=="banner" ]{
    category,
    name,
    to,
    "imageUrl" : image.asset->url
  } `);

  return {
    props : {
      banner : banner,
    }
  }
};
