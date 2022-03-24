import { RestMethod } from "../../constant/constant";
import { verify } from "jsonwebtoken";
import sanityClient from "../../api/client";
import bcrypt from "bcrypt";

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
        const data =
          await sanityClient.fetch(` *[ _type=="user" && _id=="${user.id}" ]{
            _id,
            firstName,
            lastName,
            email,
            username,
            mobile,
            address_1,
            address_2,
            "orders" : orders[]->{
              amount,
              _id,
              _createdAt,
              amount,
              status,
              items,
              razorpay_id
            }
        } `);
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
      const data = {
        ...userData,
      };
      if (data.mobile) {
        data.mobile = parseInt(data.mobile);
      }
      if (data.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        data.password = hashedPassword;
      }
      const requestBody = [
        {
          patch: {
            id: user.id,
            set: data,
          },
        },
      ];
      try {
        await sanityClient.mutate(requestBody);
        res.status(200).json({ message: "Changed Successfully" });
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
