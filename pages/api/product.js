import SetRoutes from "../../libs/SetRoutes";
import sanityClient from "../../api/client";

export default async function handler(req, res) {
  await SetRoutes(req, res, {
    getCallback: async (req, res) => {
      try {
        if (!req.query.query) {
          res.status(400).json({ message: "Please provide values" });
          return;
        }
        const query = JSON.parse(req.query.query);
        if (!query.product || !query.variant) {
          res.status(400).json({ message: "Please provide values" });
          return;
        }
        const response = await sanityClient.fetch(
          `* [ _type == "product" && _id in ${JSON.stringify(query.product)}]{
            _id,
            name,
            description,
            "image" : image.asset->url,
            "variants" :  * [ _type == "variant" && _id in ${JSON.stringify(
              query.variant
            )} && ( _id == ^.mainVariant._ref || _id in ^.variants[]._ref)]{
              _id,
              label,
              amount,
              originalPrice,
              discountedPrice,
              "images" : images[].asset->url
            },
            "subcategories" : categories[]->{
              "label" : label.current,
            }
          }`
        );
        res.status(200).json({ product: response });
      } catch (e) {
        console.log(e);
        res
          .status(500)
          .json({ message: "Something went wrong! Please try again later." });
      }
    },
  });
}
