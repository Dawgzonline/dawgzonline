import SetRoutes from "../../libs/SetRoutes";
import sanityClient from "../../api/client";
import crypto from "crypto";

export default async function handler(req, res) {
  await SetRoutes(
    req,
    res,
    {
      postCallback: async (req, res) => {
        try {
          if (!req.body) {
            res.status(409).json({ message: "Missing data" });
            return;
          }
          const data = { ...req.body };
          const givenHash = req.headers["x-razorpay-signature"];
          const shasum = crypto.createHmac(
            "sha256",
            process.env.RAZORPAY_SECRET
          );
          shasum.update(JSON.stringify(data));
          const digest = shasum.digest("hex");
          if (givenHash === digest) {
            const order_id = data.payload.payment.entity.order_id;
            const order = await sanityClient.fetch(`
            * [ _type == "order" && razorpay_id == "${order_id}"]{
                _id,
            }
            `);
            const requestBody = [
              {
                patch: {
                  id: order[0]._id,
                  set: {
                    status: "paid",
                  },
                },
              },
            ];
            await sanityClient.mutate(requestBody);
            res.status(200).json({ message: "ok" });
          } else {
            res.status(401).json({ message: "Unauthorized" });
          }
        } catch (e) {
          console.log(e);
          res
            .status(500)
            .json({ message: "Something went wrong! Please try again later." });
        }
      },
    },
    false
  );
}
