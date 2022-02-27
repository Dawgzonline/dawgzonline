import getCsvDataFromUrl from "../../libs/csv";
import SetRoutes from "../../libs/SetRoutes";
import sanityClient from "../../sanity/client";
import { v4 as uuidv4 } from "uuid";

const formatToProductData = (data) => {
  return data.map((body) => {
    const statements = body.description.split("\n").map((text) => {
      const _key = uuidv4().slice(0, 12);
      const childKey = uuidv4().slice(0, 12);
      return {
        _key,
        _type: "block",
        children: [
          {
            _type: "span",
            _key: childKey,
            marks: [],
            text: text,
          },
        ],
        markDefs: [],
        style: "normal",
      };
    });
    return {
      ...body,
      reviews: parseInt(body.reviews),
      rating: parseInt(body.rating),
      express_delivery: body.express_delivery === "true",
      description: statements,
    };
  });
};

const formatToVariantData = (data) => {
  return data.map((body) => {
    const statements = body.description.split("\n").map((text) => {
      const _key = uuidv4().slice(0, 12);
      const childKey = uuidv4().slice(0, 12);
      return {
        _key,
        _type: "block",
        children: [
          {
            _type: "span",
            _key: childKey,
            marks: [],
            text: text,
          },
        ],
        markDefs: [],
        style: "normal",
      };
    });
    return {
      ...body,
      originalPrice: parseInt(body.originalPrice),
      discountedPrice: parseInt(body.discountedPrice),
      amount: parseInt(body.amount),
      description: statements,
    };
  });
};

const resolveCategories = ( data ) => {
  return data
}

const resolveVariants = ( data ) => {
  return data
}

export default async function handler(req, res) {
  SetRoutes(
    req,
    res,
    {
      postCallback: async (req, res) => {
        if (req?.user?.role !== "webhook") {
          return res.status(401).json({ message: "Unauthorized user!" });
        }
        const productFileUrl = req.body.productFileUrl;
        const variantFileUrl = req.body.variantFileUrl;
        const productsCount = req.body.productsCount;
        const variantsCount = req.body.variantsCount;
        console.log(productFileUrl, variantFileUrl);
        res.status(200).json({ message: "Done" });
        try {
          const productData = await getCsvDataFromUrl(productFileUrl);
          const variantData = await getCsvDataFromUrl(variantFileUrl);
          const variantBody = formatToVariantData(
            variantData.slice(0, parseInt(variantsCount))
          );
          const productBody = formatToProductData(
            productData.slice(0, parseInt(productsCount))
          );
          const variantMapping = {};
          for (let variant of variantBody) {
            const id = variant.id;
            delete variant.id;
            const body = { ...variant, _type: "variant" };
            const response = await sanityClient.create(body);
            console.log(response);
            variantMapping[id] = response._id;
          }
          const variantedProduct = resolveVariants(variantMapping, productBody);
          const handledProduct = resolveCategories(variantedProduct);
          for (let product of handledProduct) {
            delete product.id;
            const body = { ...product, _type: "product" };
            const response = await sanityClient.create(body);
            console.log(response);
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something went wrong!",
          });
        }
      },
    },
    true
  );
}
