// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: process.env.SANITY_PROJECTID, // you can find this in sanity.json
  dataset: process.env.SANITY_DATASET, // or the name you chose in step 1
  useCdn: false,// `false` if you want to ensure fresh data
  apiVersion: process.env.SANITY_API_VERSION, // use a UTC date string
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
})