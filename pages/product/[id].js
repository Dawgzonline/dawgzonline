import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductPage from "../../components/ProductPage";
import sanityClient from "../../sanity/client";

export default function product({ product }) {
  return (
    <div>
      <Head>
        <title>Dawgzonline - {product?.name ? product.name : "product"}</title>
      </Head>
      <Navbar />
      <ProductPage product={product} />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const [product] =
    await sanityClient.fetch(` *[ _type=="product" && _id=="${params.id}" && !(_id in path('drafts.**')) ]{
    _id,
    description,
    "discountedPrice" : mainVariant->discountedPrice,
    name,
    "originalPrice" : mainVariant->originalPrice,
    "imageUrl" : image.asset->url,
  } `);
  return {
    props: {
      product: product,
    },
  };
};
