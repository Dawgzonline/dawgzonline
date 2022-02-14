import axios from "axios";

const fetch = axios.create({
  baseURL: `https://${process.env.SANITY_PROJECTID}.api.sanity.io/v${process.env.SANITY_API_VERSION}/data/mutate/${process.env.SANITY_DATASET}`,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
  },
});

export default fetch;
