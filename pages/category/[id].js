import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductsPage from "../../components/ProductsPage";
import sanityClient from "../../api/client";

export default function category({ products, categories }) {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Products</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mini-logo.webp" />
      </Head>
      <Navbar />
      <ProductsPage products={products} categories={categories} />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const products =
    await sanityClient.fetch(` *[ _type=="product" && !(_id in path('drafts.**')) ]{
    _id,
    description,
    "discountedPrice" : mainVariant->discountedPrice,
    name,
    "originalPrice" : mainVariant->originalPrice,
    "imageUrl" : image.asset->url,
    "subcategories" : categories[]->{
      "label" : label.current,
    }
  } `);
  const subcategories =
    await sanityClient.fetch(` *[ _type== "subcategory" && !(_id in path('drafts.**'))  ]{
    name,
      "label" : label.current,
      "categories" : categories[]->{
        name, 
        "label" : label.current
      }
  } `);

  const categories = {};
  subcategories.forEach((subcategory) => {
    subcategory?.categories?.forEach((cate) => {
      if (categories[cate.label]) {
        categories[cate.label].subcategories.push({
          name: subcategory.name,
          label: subcategory.label,
        });
      } else {
        categories[cate.label] = {
          label: cate.label,
          name: cate.name,
          subcategories: [
            {
              name: subcategory.name,
              label: subcategory.label,
            },
          ],
        };
      }
    });
  });

  const categoriesArray = [];
  for (const value of Object.values(categories)) {
    categoriesArray.push(value);
  }

  return {
    props: {
      products: [...products],
      categories: categoriesArray,
    },
  };
};