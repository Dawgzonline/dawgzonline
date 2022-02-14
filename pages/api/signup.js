// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { RestMethod } from "../../constant/constant";
import  sanityClient  from "../../sanity/client";
import sanityFetch from "../../sanity/fetch";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case RestMethod.get:
      res
        .status(405)
        .json({ message: "Please send signup request by post method" });
      break;
    case RestMethod.post:
      const userData = req.body;
      if (!userData) {
        res.status(400).json({ message: "No data found!" });
        return;
      }
      const user = await sanityClient.fetch(`*[ _type=="user" && email=="${userData.email}" ]`);
      if (user.length !== 0){
        res.status(409).json({ message : "User already existed"});
        return;
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10); 
      const requestBody = {
        "mutations": [
          {
            "create": {
              "_type" : "user",
              "firstName" : userData.firstName,
              "lastName" : userData.lastName,
              "username" : userData.email,
              "email" : userData.email,
              "password": hashedPassword,
              "auth_type": "custom_auth",
            }
          }
        ]
      }
      try{
      const response = await sanityFetch.post("/",requestBody);
      console.log(response.data);
      res.status(201).json({ message: "User created successfully" });
      }catch(e){
        console.log(e.response);
      res.status(500).json({ message: "Something went wrong. Please try again later!" });
      }
      break;
    default:
      res
        .status(405)
        .json({ message: "Please send login request by post method" });
      break;
  }
}
