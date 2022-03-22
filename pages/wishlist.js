import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import sanityClient from "../api/client"

export default function wishlist({categories}) {
  return (
    <div>
      <Head>
        <title>Dawgzonline - Wishlist</title>
      </Head>
      <Navbar />
      <Wishlist categories={categories}/>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const subcategories = await sanityClient.fetch(` *[ _type== "subcategory" && !(_id in path('drafts.**'))  ]{
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
  for( const value of Object.values(categories)){
    categoriesArray.push(value);
  }

  return {
    props: {
      categories : categoriesArray,
    },
  };
};

