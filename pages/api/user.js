import { RestMethod } from "../../constant/constant";
import { verify } from "jsonwebtoken";
import sanityClient from "../../sanity/client";

export default async function handler(req, res) {
  const { method, headers } = req;
  switch (method) {
    case RestMethod.get:
      if (!headers["authorization"]) {
        res.status(401).json({ message: "Please login again" });
      }
      try {
        const user = verify(
          headers.authorization.split(" ")[1],
          process.env.JWT_SECRET
        );
        console.log(user);
        const data =
          await sanityClient.fetch(` *[ _type=="user" && _id=="${user.id}" ]{
            firstName,
            lastName,
            email,
            username,
            mobile,
            address_1,
            address_2,
        } `);
        console.log(data);
        res.status(200).json({ ...data[0] });
      } catch (e) {
        console.log(e);
        res
          .status(500)
          .json({ message: "Something went wrong! Please try again later!" });
      }
      break;
    case RestMethod.post:
      const userData = req.body;
      if (!userData) {
        res.status(400).json({ message: "No data found!" });
        return;
      }
      if (!headers["authorization"]) {
        res.status(401).json({ message: "Please login again" });
      }
      const user = verify(
        headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      const requestBody = [
          {
            patch: {
              id: user.id,
              set: {
                ...userData,
              },
            },
          },
        ]
      ;
      try {
        await sanityClient.mutate(requestBody);
        res.status(201).json({ message: "User created successfully" });
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
        .json({ message: "Please send your request to correct method" });
      break;
  }
}
