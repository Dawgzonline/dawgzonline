// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { RestMethod } from "../../constant/constant";
import sanityClient from "../../sanity/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case RestMethod.get:
      res
        .status(405)
        .json({ message: "Please send login request by post method" });
      break;
    case RestMethod.post:
      const userData = req.body;
      if (!userData) {
        res.status(400).json({ message: "No data found!" });
        return;
      }
      const user = await sanityClient.fetch(
        `*[ _type=="user" && email=="${userData.username}" ]`
      );
      if (user.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      try {
        const isValidUser = await bcrypt.compare(userData.password, user[0].password);
        if (isValidUser) {
          res.status(200).json({ message: "User login successfull" });
        } else {
          res.status(409).json({ message: "Incorrect password" });
        }
      } catch (e) {
        console.log(e.response);
        res
          .status(500)
          .json({ message: "Something went wrong. Please try again later!" });
      }
      break;
    default:
      res
        .status(405)
        .json({ message: "Please send login request by post method" });
      break;
  }
}
